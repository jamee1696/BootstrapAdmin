﻿using Bootstrap.Admin.Extensions;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace Bootstrap.Admin.Components
{
    /// <summary>
    /// Toast 组件基类
    /// </summary>
    public class ToastBase : ComponentBase
    {
        /// <summary>
        /// IJSRuntime 实例
        /// </summary>
        [Inject]
        protected IJSRuntime? JSRuntime { get; set; }

        /// <summary>
        /// 是否自动隐藏 默认为 true
        /// </summary>
        [Parameter]
        public bool AutoHide { get; set; } = true;

        /// <summary>
        /// 自动隐藏延时 默认为 1500 毫秒
        /// </summary>
        [Parameter]
        public int Interval { get; set; } = 2000;

        /// <summary>
        /// 组件显示位置
        /// </summary>
        [Parameter]
        public Placement Placement { get; set; }

        /// <summary>
        /// Toast 类型
        /// </summary>
        [Parameter]
        public ToastCategory Category { get; set; }

        /// <summary>
        /// 组件标题文本
        /// </summary>
        [Parameter]
        public string Title { get; set; } = "BootstrapAdmin Blazor";

        /// <summary>
        /// 消息正文
        /// </summary>
        [Parameter]
        public string Text { get; set; } = "Toast 消息正文内容-未设置";

        /// <summary>
        /// 获得/设置 组件 ID
        /// </summary>
        [Parameter]
        public string Id { get; set; } = "";

        /// <summary>
        /// 控件呈现后回调方法
        /// </summary>
        /// <param name="firstRender"></param>
        protected override void OnAfterRender(bool firstRender)
        {
            if (firstRender)
            {
                JSRuntime.InitToast();
            }
            if (_show)
            {
                _show = false;
                Show();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        protected void Show()
        {
            JSRuntime.ShowToast();
        }

        private bool _show;
        /// <summary>
        /// 
        /// </summary>
        public void ShowMessage(string title, string text, ToastCategory category = ToastCategory.Success)
        {
            Title = title;
            Text = text;
            Category = category;
            _show = true;
            StateHasChanged();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        protected string RenderCategory()
        {
            var ret = "";
            switch (Category)
            {
                case ToastCategory.Error:
                    ret = "fa fa-times-circle text-danger";
                    break;
                case ToastCategory.Information:
                    ret = "fa fa-exclamation-triangle text-info";
                    break;
                case ToastCategory.Success:
                    ret = "fa fa-check-circle text-success";
                    break;
            }
            return ret;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        protected string RenderAnimation()
        {
            return AutoHide ? $"transition: width {(Interval * 1.0 - 200) / 1000}s linear;" : "";
        }
    }
}
