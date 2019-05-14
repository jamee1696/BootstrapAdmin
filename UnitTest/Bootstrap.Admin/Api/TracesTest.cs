﻿using Bootstrap.DataAccess;
using Longbow.Web.Mvc;
using System;
using Xunit;

namespace Bootstrap.Admin.Api.SqlServer
{
    public class TracesTest : ControllerTest
    {
        public TracesTest(BAWebHost factory) : base(factory, "api/Traces") { }

        [Fact]
        public async void Get_Ok()
        {
            var trac = new Trace() { Browser = "UnitTest", OS = "UnitTest", City = "本地连接", Ip = "::1", RequestUrl = "~/UnitTest", UserName = "UnitTest", LogTime = DateTime.Now };
            trac.Save(trac);

            // 菜单 系统菜单 系统使用条件
            var query = "?sort=LogTime&order=desc&offset=0&limit=20&operateType=&OperateTimeStart=&OperateTimeEnd=&_=1547617573596";
            var qd = await Client.GetAsJsonAsync<QueryData<Trace>>(query);
            Assert.NotEmpty(qd.rows);

            // clean
            DbManager.Create().Execute("Delete from Traces where LogTime = @0", trac.LogTime);
        }
    }
}
