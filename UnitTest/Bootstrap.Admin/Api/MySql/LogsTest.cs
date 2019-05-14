﻿using Xunit;

namespace Bootstrap.Admin.Api.MySql
{
    [Collection("MySqlContext")]
    public class LogsTest : SqlServer.LogsTest
    {
        public LogsTest(MySqlBAWebHost factory) : base(factory) { }
    }
}
