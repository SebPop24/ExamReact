using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    public class HomeController : Controller
    {
       
        public IActionResult Index()
        {
            // Returns a View
            return View();
        }
    }

     
}




