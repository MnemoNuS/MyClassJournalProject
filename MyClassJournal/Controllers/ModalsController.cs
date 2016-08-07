using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyClassJournal.Controllers
{
    public class ModalsController : Controller
    {
        // GET: Modals

        public ActionResult AddPupil()
        {
            ViewBag.Message = "Добывить ученика";

            return View();
        }
    }
}