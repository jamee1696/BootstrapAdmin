﻿using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Bootstrap.Admin.Extensions
{
    /// <summary>
    /// JSRuntime 扩展操作类
    /// </summary>
    public static class JSRuntimeExtensions
    {
        /// <summary>
        /// 根据指定菜单 ID 激活侧边栏菜单项
        /// </summary>
        /// <param name="jsRuntime"></param>
        /// <param name="menuId"></param>
        /// <returns></returns>
        public static void ActiveMenu(this IJSRuntime? jsRuntime, string? menuId)
        {
            if (!string.IsNullOrEmpty(menuId) && jsRuntime != null) jsRuntime.InvokeVoidAsync("$.activeMenu", menuId);
        }

        /// <summary>
        /// 导航条前移一个 Tab
        /// </summary>
        /// <param name="jSRuntime"></param>
        /// <returns></returns>
        public static async ValueTask<string> MovePrevTabAsync(this IJSRuntime? jSRuntime) => jSRuntime == null ? "" : await jSRuntime.InvokeAsync<string>("$.movePrevTab");

        /// <summary>
        /// 导航条后移一个 Tab
        /// </summary>
        /// <param name="jSRuntime"></param>
        /// <returns></returns>
        public static async ValueTask<string> MoveNextTabAsync(this IJSRuntime? jSRuntime) => jSRuntime == null ? "" : await jSRuntime.InvokeAsync<string>("$.moveNextTab");

        /// <summary>
        /// 
        /// </summary>
        /// <param name="jsRuntime"></param>
        /// <param name="pageId"></param>
        public static void ActivePage(this IJSRuntime? jsRuntime, string? pageId)
        {
            if (!string.IsNullOrEmpty(pageId) && jsRuntime != null) jsRuntime.InvokeVoidAsync("$.activePage", pageId);
        }

        /// <summary>
        /// 移除指定 ID 的导航条
        /// </summary>
        /// <param name="jSRuntime"></param>
        /// <param name="tabId"></param>
        /// <returns></returns>
        public static async ValueTask<string> RemoveTabAsync(this IJSRuntime? jSRuntime, string? tabId) => string.IsNullOrEmpty(tabId) || jSRuntime == null ? "" : await jSRuntime.InvokeAsync<string>("$.removeTab", tabId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="jSRuntime"></param>
        public static void EnableAnimation(this IJSRuntime? jSRuntime) => jSRuntime.InvokeVoidAsync("$.enableAnimation");

        /// <summary>
        /// 
        /// </summary>
        /// <param name="jSRuntime"></param>
        /// <param name="val"></param>
        public static void EnableBackground(this IJSRuntime? jSRuntime, bool val) => jSRuntime.InvokeVoidAsync("$.enableBackground", val);
    }
}
