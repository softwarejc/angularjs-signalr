using System.Web.Mvc;
using System.Web.Routing;

namespace AngularJS_SignalR
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            // all router within angular are catch by angular ui.router
            routes.MapRoute(
                    name: "AngularSPA",
                    url: "{*any}",
                    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
