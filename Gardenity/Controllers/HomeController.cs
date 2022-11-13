using Gardenity.Models;
using Gardenity.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Gardenity.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly INotificationSender _sendNotif;

        public HomeController(ILogger<HomeController> logger, INotificationSender sendNotif)
        {
            _logger = logger;
            _sendNotif = sendNotif;
        }

        public async Task<IActionResult> Index()
        {
            _ = await _sendNotif.SendText("+18579710700", "Helloworld");
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Main()
        {

            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}