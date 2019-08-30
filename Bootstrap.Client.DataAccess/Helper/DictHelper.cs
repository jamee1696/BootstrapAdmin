﻿using Bootstrap.Security;
using Bootstrap.Security.DataAccess;
using Longbow.Cache;
using Longbow.Data;
using System.Collections.Generic;

namespace Bootstrap.Client.DataAccess
{
    /// <summary>
    /// 
    /// </summary>
    public static class DictHelper
    {
        /// <summary>
        /// 
        /// </summary>
        /// <summary>
        /// 缓存索引，BootstrapAdmin后台清理缓存时使用
        /// </summary>
        public const string RetrieveDictsDataKey = DbHelper.RetrieveDictsDataKey;

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<BootstrapDict> RetrieveDicts() => CacheManager.GetOrAdd(RetrieveDictsDataKey, key => DbContextManager.Create<Dict>().RetrieveDicts());

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<KeyValuePair<string, string>> RetrieveApps() => DbContextManager.Create<Dict>().RetrieveApps();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public static string RetrieveWebTitle() => DbContextManager.Create<Dict>().RetrieveWebTitle();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public static string RetrieveWebFooter() => DbContextManager.Create<Dict>().RetrieveWebFooter();

        /// <summary>
        /// 获得网站设置中的当前样式
        /// </summary>
        /// <returns></returns>
        public static string RetrieveActiveTheme() => DbContextManager.Create<Dict>().RetrieveActiveTheme();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public static string RetrieveLocaleIPSvr() => DbContextManager.Create<Dict>().RetrieveLocaleIPSvr();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="ipSvr">ip地址请求服务名称</param>
        /// <returns></returns>
        public static string RetrieveLocaleIPSvrUrl(string ipSvr) => DbContextManager.Create<Dict>().RetrieveLocaleIPSvrUrl(ipSvr);

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public static string RetrieveLocaleIPSvrCachePeriod() => DbContextManager.Create<Dict>().RetrieveLocaleIPSvrCachePeriod();

        /// <summary>
        /// 获得 是否为演示系统 默认为 false 不是演示系统
        /// </summary>
        /// <returns></returns>
        public static bool RetrieveSystemModel() => DbContextManager.Create<Dict>().RetrieveSystemModel();

        /// <summary>
        /// 获得验证码图床地址
        /// </summary>
        /// <returns></returns>
        public static string RetrieveImagesLibUrl() => DbContextManager.Create<Dict>().RetrieveImagesLibUrl();

        /// <summary>
        /// 获取头像路径
        /// </summary>
        /// <returns></returns>
        public static string RetrieveIconFolderPath() => DbContextManager.Create<Dict>().RetrieveIconFolderPath();

        /// <summary>
        /// 获得数据区卡片标题是否显示
        /// </summary>
        /// <returns></returns>
        public static bool RetrieveCardTitleStatus() => DbContextManager.Create<Dict>().RetrieveCardTitleStatus();

        /// <summary>
        /// 获得侧边栏状态 未真时显示
        /// </summary>
        /// <returns></returns>
        public static bool RetrieveSidebarStatus() => DbContextManager.Create<Dict>().RetrieveSidebarStatus();

        /// <summary>
        /// 获得系统设置地址
        /// </summary>
        /// <returns></returns>
        public static string RetrieveSettingsUrl() => DbContextManager.Create<Dict>().RetrieveSettingsUrl();

        /// <summary>
        /// 获得系统个人中心地址
        /// </summary>
        /// <returns></returns>
        public static string RetrieveProfilesUrl() => DbContextManager.Create<Dict>().RetrieveProfilesUrl();

        /// <summary>
        /// 获得系统通知地址地址
        /// </summary>
        /// <returns></returns>
        public static string RetrieveNotisUrl() => DbContextManager.Create<Dict>().RetrieveNotisUrl();
    }
}
