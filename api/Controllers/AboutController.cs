using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    public class AboutController : Controller
    {
       
        public IActionResult Index()
        {
            // Returns a View
            return View();
        }
    }
}



