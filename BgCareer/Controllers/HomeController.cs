using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Net.Mime;
using System.Web;
using System.Web.Mvc;
using BgCareer.Models;

namespace BgCareer.Controllers
{
    public class HomeController : Controller
    {
        [AllowAnonymous]
        [HttpPost]
        public ActionResult Uploadattachment(CareerModel fileData)
        {
            if (Request.Files.Count > 0 && fileData.Email != null && fileData.Name != null && 
                !fileData.PhoneNumber.Equals(0) && fileData.Position != null)
            {
                try
                {
                    //  Get all files from Request object  
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        //string path = AppDomain.CurrentDomain.BaseDirectory + "Uploads/";  
                        //string filename = Path.GetFileName(Request.Files[i].FileName);  

                        HttpPostedFileBase file = files[i];
                        string fname;

                        // Checking for Internet Explorer  
                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];//wrong
                        }
                        else
                        {
                            fname = file.FileName;
                        }
                        // Get the complete folder path and store the file inside it.  
                        fname = Path.Combine(Server.MapPath("~/EmailAttachments/"), fname);
                        file.SaveAs(fname);

                        //Sending mail

                        MailMessage mail = new MailMessage();
                        //SmtpClient SmtpServer = new SmtpClient("smtp.office365.com", 587);
                        SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com", 587);
                        //SmtpServer.EnableSsl = true;
                        //client.Port = 587;
                        //client.Credentials = new System.Net.NetworkCredential(username.Text, password.Text);
                        mail.From = new MailAddress("binghattiholdings@gmail.com");

                        mail.To.Add("binghattiholdings@gmail.com");
                        //mail.Subject = "New Resume";
                        mail.Subject = fileData.Position;

                        string Body = "NAME: " + fileData.Name + System.Environment.NewLine + System.Environment.NewLine +
                                      "TEL NO: " + fileData.PhoneNumber + System.Environment.NewLine + System.Environment.NewLine+
                                      "EMAIL ID: " + fileData.Email + System.Environment.NewLine + System.Environment.NewLine +
                                      "Position: " +fileData.Position;
                        mail.Body = Body;


                        //mail.Body =  fileData.Name +System.Environment.NewLine+System.Environment.NewLine+ fileData.PhoneNumber +System.Environment.NewLine+ fileData.Email;

                        //System.Net.Mail.Attachment attachment;
                        //attachment = new System.Net.Mail.Attachment(fname);
                        Attachment attachment = new Attachment(fname, MediaTypeNames.Application.Octet);

                        mail.Attachments.Add(attachment);
                        // mail.Attachments.Add(attachment);

                        //SmtpServer.Port = 587;
                        SmtpServer.Credentials = new System.Net.NetworkCredential("binghattiholdings@gmail.com", "binghatti*2*2");
                        SmtpServer.EnableSsl = true;

                        SmtpServer.Send(mail);//Getting exception here
                        //deleting file after sending mail...
                        if (System.IO.File.Exists(fname))
                        {
                            // Use a try block to catch IOExceptions, to 
                            // handle the case of the file already being 
                            // opened by another process. 
                            try
                            {
                                System.IO.File.Delete(fname);
                            }
                            catch (System.IO.IOException e)
                            {
                                Console.WriteLine(e.Message);
                            }
                        }
                        // Returns message that successfully uploaded  
                        return Json("Submitted Successfully!");
                    }
                }
                catch (Exception ex)
                {
                    return Json("Error occurred. Error details: " + ex.Message);
                }
            }
            else
            {
                return Json("No files selected.");
            }

            return null;
        }

        // Code for PDF only upaload
        //protected void fileUpload(object sender, EventArgs e)

        //{

        //    string[] validFileTypes = { "pdf" };

        //    string ext = System.IO.Path.GetExtension(FileUpload1.PostedFile.FileName);

        //    bool isValidFile = false;

        //    for (int i = 0; i < validFileTypes.Length; i++)

        //    {

        //        if (ext == "." + validFileTypes[i])

        //        {

        //            isValidFile = true;

        //            break;

        //        }

        //    }

        //    if (!isValidFile)

        //    {

        //        Label1.ForeColor = System.Drawing.Color.Red;

        //        Label1.Text = "Invalid File. Please upload a File with extension " +

        //                       string.Join(",", validFileTypes);

        //    }

        //    else

        //    {

        //        Label1.ForeColor = System.Drawing.Color.Green;

        //        Label1.Text = "File uploaded successfully.";

        //    }

        //}



        //private void log()
        //{
        //    fname = Path.Combine(Server.MapPath("~/EmailAttachments/"), fname);
        //    string path = Path.Combine(Server.MapPath("~/EmailAttachments/"), fname);
        //    if (!File.Exists(path))
        //    {
        //        File.Create(path);
        //        TextWriter tw = new StreamWriter(path);
        //        tw.WriteLine("The very first line!");
        //        tw.Close();
        //    }
        //    else if (File.Exists(path))
        //    {
        //        TextWriter tw = new StreamWriter(path);
        //        tw.WriteLine("The next line!");
        //        tw.Close();
        //    }
        //}


        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}