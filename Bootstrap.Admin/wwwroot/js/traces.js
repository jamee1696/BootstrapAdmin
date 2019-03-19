$(function () {
    var url = 'api/Traces';
    var $data = $('#requestData');
    var $dialog = $('#dialogRequestData');

    $('.card-body table').smartTable({
        url: url,
        sortName: 'LogTime',
        sortOrder: 'desc',
        queryParams: function (params) { return $.extend(params, { OperateTimeStart: $("#txt_operate_start").val(), OperateTimeEnd: $("#txt_operate_end").val() }); },
        columns: [
            { title: "用户名称", field: "UserName", sortable: true },
            { title: "操作时间", field: "LogTime", sortable: true },
            { title: "登录主机", field: "Ip", sortable: true },
            { title: "操作地点", field: "City", sortable: true },
            { title: "浏览器", field: "Browser", sortable: true },
            { title: "操作系统", field: "OS", sortable: true },
            { title: "操作页面", field: "RequestUrl", sortable: true }
        ],
        exportOptions: {
            fileName: "访问日志数据",
            ignoreColumn: [8]
        }
    });
});