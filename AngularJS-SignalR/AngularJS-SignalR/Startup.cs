using AngularJS_SignalR;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Startup))]

namespace AngularJS_SignalR
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // SignalR
            app.MapSignalR();
        }
    }
}
