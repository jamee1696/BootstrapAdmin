﻿using Microsoft.AspNetCore.Components;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System;
using System.Linq.Expressions;

namespace Bootstrap.Admin.Components
{
    /// <summary>
    /// 
    /// </summary>
    public class EqualToValidator : ValidatorComponentBase
    {
        /// <summary>
        /// 
        /// </summary>
        public EqualToValidator()
        {
            ErrorMessage = "你的输入不相同";
        }

        /// <summary>
        /// 
        /// </summary>
        [Parameter]
        public string Value { get; set; } = "";

        /// <summary>
        /// 
        /// </summary>
        [Parameter]
        public EventCallback<string> ValueChanged { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="propertyValue"></param>
        /// <param name="context"></param>
        /// <param name="results"></param>
        public override void Validate(object? propertyValue, ValidationContext context, List<ValidationResult> results)
        {
            var val = propertyValue?.ToString() ?? "";
            if (val != Value)
                results.Add(new ValidationResult(ErrorMessage, new string[] { context.MemberName }));
        }
    }
}
