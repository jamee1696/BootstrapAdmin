﻿(function ($) {
    'use strict';

    var Validate = function (element, options) {
        var that = this;
        this.$element = $(element)
        this.options = $.extend({
            pendingRequest: 0,
            pending: {},
            successList: [],
            optional: function () { return false; },
            invalid: {},
            getLength: function (value, element) {
                switch (element.nodeName.toLowerCase()) {
                    case "select":
                        return $("option:selected", element).length;
                    case "input":
                        if (this.checkable(element)) {
                            return this.findByName(element.name).filter(":checked").length;
                        }
                }
                return value.length;
            },
            checkable: function (element) {
                return (/radio|checkbox/i).test(element.type);
            },
            depend: function (param, element) {
                return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
            },
            dependTypes: {
                "boolean": function (param) {
                    return param;
                },
                "string": function (param, element) {
                    return !!$(param, element.form).length;
                },
                "function": function (param, element) {
                    return param(element);
                }
            },
            findByName: function (name) {
                return $('body').find("[name='" + this.escapeCssMeta(name) + "']");
            },
            escapeCssMeta: function (string) {
                return string.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1");
            },
            previousValue: function (element, method) {
                method = typeof method === "string" && method || "remote";
                return $.data(element, "previousValue") || $.data(element, "previousValue", {
                    old: null,
                    valid: true,
                    message: "请修正本字段"
                });
            },
            startRequest: function (element) {
                if (!this.pending[element.name]) {
                    this.pendingRequest++;
                    $(element).addClass(this.settings.pendingClass);
                    this.pending[element.name] = true;
                }
            },
            stopRequest: function (element, valid) {
                this.pendingRequest--;

                // Sometimes synchronization fails, make sure pendingRequest is never < 0
                if (this.pendingRequest < 0) {
                    this.pendingRequest = 0;
                }
                delete this.pending[element.name];
                $(element).removeClass(this.settings.pendingClass);
            },
            showErrors: function (errors) {
                for (var name in errors) {
                    var element = document.getElementById(name);
                    var $element = $(element);
                    that.tooltip.call(that, element, false);
                    $element.lgbTooltip('show');
                }
            },
            defaultMessage: function (element, rule) {
                return that.defaultMessage(element, rule);
            },
            resetInternals: function () { },
            errorsFor: function (element) {
                that.tooltip.call(that, element, true);
            },
            settings: $.validator.defaults
        }, this.defaults(), options)
        this.$element.on('input.lgb.validate', this.options.childClass, function () {
            if (!that.validElement(this)) $(this).lgbTooltip('show');
        }).on('inserted.bs.tooltip', this.options.childClass, function () {
            $('#' + $(this).attr('aria-describedby')).addClass(that.options.errorClass);
        });
        if (!this.options.validButtons) return;
        this.$element.find(this.options.validButtons).on('click.lgb.validate', function (e) {
            var valid = that.valid();
            $(this).attr(Validate.DEFAULTS.validResult, valid);
            if (!valid) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        });
    };

    Validate.VERSION = '1.0';

    Validate.DEFAULTS = {
        validClass: 'has-success',
        errorClass: 'has-error',
        childClass: '[data-valid="true"]',
        validResult: 'data-valid-result'
    };

    Validate.prototype.defaults = function () {
        return $.extend({ container: this.$element }, Validate.DEFAULTS, {
            validClass: this.$element.attr('data-validclass'),
            errorClass: this.$element.attr('data-errorclass'),
            validButtons: this.$element.attr('data-valid-button'),
            container: this.$element.attr('data-container')
        });
    };

    Validate.prototype.reset = function () {
        var css = this.options.validClass + ' ' + this.options.errorClass;
        this.$element.find(this.options.childClass).each(function () {
            var $this = $(this);
            $this.lgbTooltip('destroy');
            $this.parent().removeClass(css);
        });
    };

    Validate.prototype.valid = function () {
        var that = this;
        var op = this.options;
        var $firstElement = null;

        this.$element.find(this.options.childClass + ':visible').each(function () {
            if (!that.validElement(this) && $firstElement == null) $firstElement = $(this);
        });
        if ($firstElement) $firstElement.tooltip('show');
        return $firstElement == null;
    };

    Validate.prototype.validElement = function (element) {
        var result = this.check(element);
        this.tooltip(element, result);
        return result
    };

    Validate.prototype.tooltip = function (element, valid) {
        if (valid == "pending") return;

        var op = this.options;
        var $this = $(element);
        var $parent = $this.parent();
        try {
            if (valid) $this.lgbTooltip('destroy');
            else {
                if (!$parent.hasClass('has-error')) $this.lgbTooltip({ container: $(window).width() > 768 ? op.container : (this.$element.find('.modal-body') || this.$element.find('.panel-body') || op.container) });
            }
        }
        catch (e) {

        }
        if (!valid) {
            $parent.removeClass(op.validClass).addClass(op.errorClass);
        }
        else {
            $parent.removeClass(op.errorClass).addClass(op.validClass);
        }
    };

    Validate.prototype.check = function (element) {
        var result = true;
        var $this = $(element);

        var methods = this.rules(element);
        for (var rule in methods) {
            if ($.isFunction($.validator.methods[rule])) {
                result = $.validator.methods[rule].call(this.options, $this.val(), element, methods[rule]);
                if (!result || result === "pending") {
                    $this.attr('data-original-title', this.defaultMessage(element, { method: rule, parameters: methods[rule] }));
                    break;
                }
            }
            else {
                console.log('没有匹配的方法 ' + rule);
            }
        }
        return result;
    };

    Validate.prototype.defaultMessage = function (element, rule) {
        var message = $(element).attr('data-' + rule.method + '-msg') || (rule.method == 'required' && $(element).attr('placeholder')) || $.validator.messages[rule.method];
        var theregex = /\$?\{(\d+)\}/g;
        if (typeof message === "function") {
            message = message.call(this, rule.parameters, element);
        } else if (theregex.test(message)) {
            message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
        }
        return message;
    };

    Validate.prototype.attributeRules = function (element) {
        var rules = {}, $element = $(element), value;

        $.each(["radioGroup"], function () {
            value = element.getAttribute(this);
            if (value === "") value = true;
            value = !!value;
            rules[this] = value;
            if (value) {
                rules["required"] = false;
                $(element).on('change', ':radio', function () {
                    $(this).trigger('input.lgb.validate');
                });
            }
        });
        $.each(["remote"], function () {
            if (element.getAttribute(this)) {
                if (element.name === "") element.name = element.id;
                var para = $(element).attr(this);
                rules[this] = $.formatUrl(para);
            }
        });
        return rules;
    };

    Validate.prototype.rules = function (element) {
        var $this = $(element);
        var rules = $this.data('lgb.Validate.Rules');
        if (!rules) $this.data('lgb.Validate.Rules', (rules = $.validator.normalizeRules($.extend({ required: true }, $.validator.classRules(element), $.validator.attributeRules(element), this.attributeRules(element)))));
        return rules;
    };

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('lgb.Validate');
            var options = typeof option == 'object' && option;

            if (!data && /valid|defaults/.test(option)) return
            if (!data) $this.data('lgb.Validate', (data = new Validate(this, options)));
            if (typeof option == 'string') data[option]();
        })
    };

    $.fn.lgbValidate = Plugin;
    $.fn.lgbValidate.Constructor = Validate;
    $.fn.lgbValidator = function () {
        return this.data('lgb.Validate');
    };
    $.fn.lgbValid = function () {
        var $this = this;
        return $this.attr(Validate.DEFAULTS.validResult) == 'true';
    };

    $(function () {
        $('[data-toggle="LgbValidate"]').lgbValidate();
    });
})(jQuery);