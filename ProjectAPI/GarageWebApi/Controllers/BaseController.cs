using G.ENTITY;
using GarageWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System.Security.Claims;

namespace GarageWebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        private readonly IStringLocalizer<StatusMessages> _statusMessageLocalizer;

        public BaseController(IStringLocalizer<StatusMessages> statusMessageLocalizer)
        {
            this._statusMessageLocalizer = statusMessageLocalizer;
        }
        [Authorize]
        protected UserMainModel? GetCurrentUser()
        {
            UserMainModel user = null;
            var currentUser = HttpContext.User;
            if (currentUser == null)
                return null;
            if (currentUser.Identity is ClaimsIdentity identity)
            {

                user = new UserMainModel
                {
                    //Just setting UID here can include more values --Nithin
                    UId = long.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value)

                };
            }

            return user;
        }

        protected string GetStatusMessage(string statuscode)
        {
            return _statusMessageLocalizer.GetString(statuscode).Value ?? "";
        }
        protected object? GetResponse(DB_STATUS _result)
        {
            // Ensure _result is not null
            if (_result == null)
            {
                throw new ArgumentNullException(nameof(_result), "DB_STATUS object is null");
            }

            // Initialize StatusMessage if it's null
            if (_result.StatusMessage == null)
            {
                _result.StatusMessage = string.Empty;
            }

            // Populate StatusMessage and Success properties
            this.GetStatusMessage(_result.Status);
            _result.Success = _result.Id > 0;

            return _result;
        }


        public static string GetSerialStatusMsg(string status, string transToCheck)
        {
            // string status = dsSerialStatus.Tables[1].Rows[0]["serialStatus"].ToString();
            string details = "The system cannot accept this serial because it is ";

            switch (transToCheck)
            {
                case "pr":
                case "to":
                case "sa":
                    {
                        switch (status)
                        {
                            //case "0": detail0 = "AVAILABLE in the INVENTORY."; break;
                            case "1": details += "NOT CONFIRMED after purchase."; break;
                            case "2": details += "ALREADY RETURNED to the supplier."; break;
                            case "3": details += "ALREADY TRANSFERRED to another branch."; break;
                            case "4": details += "NOT CONFIRMED after transfer."; break;
                            case "5": details += "ALREADY SOLD."; break;
                            //case "6": details += "ALREADY RETURNED from the customer."; break;
                            //case "7": details += "ALREADY CONFIRMED after purchase."; break;
                            //case "8": details += "ALREADY CONFIRMED after transfer."; break;
                            case "9": details += "ALREADY RETURNED to supplier , but NOT CONFIRMED."; break;    //19mar2010
                        }
                    }
                    break;
                case "sr":
                    {
                        switch (status)
                        {
                            case "0": details += "AVAILABLE in the INVENTORY."; break;
                            case "1": details += "NOT CONFIRMED after purchase."; break;
                            case "2": details += "ALREADY RETURNED to the supplier."; break;
                            case "3": details += "ALREADY TRANSFERRED to another branch."; break;
                            case "4": details += "NOT CONFIRMED after transfer."; break;
                            //case "5": details += "ALREADY SOLD."; break;
                            case "6": details += "ALREADY RETURNED from the customer."; break;
                            case "7": details += "ALREADY CONFIRMED after purchase."; break;
                            case "8": details += "ALREADY CONFIRMED after transfer."; break;
                            case "9": details += "ALREADY RETURNED to supplier , but NOT CONFIRMED."; break;    //19mar2010
                        }
                    }
                    break;
            }
            //details += "\n\nDetails:\n\n";
            //details += "Serial Status          :  " + status;
            //details += "\nLast Trans             :  " + dsSerialStatus.Tables[1].Rows[0]["trnName"].ToString();
            //details += "\nInvoice No             :  " + dsSerialStatus.Tables[1].Rows[0]["trnNumber"].ToString();
            //details += "\nInvoice Date          :  " + dsSerialStatus.Tables[1].Rows[0]["trnDate"].ToString();
            //details += "\nInvoice Branch      :  " + dsSerialStatus.Tables[1].Rows[0]["trnBranch"].ToString();
            //if (status == "1")
            //    details += "\nVendor                  :  " + dsSerialStatus.Tables[1].Rows[0]["VendorName"].ToString();
            //if (status == "3" || status == "4") // Transfer Out/Transfer In
            //    details += "\nInvoice To Branch   : " + dsSerialStatus.Tables[1].Rows[0]["trnToBranch"].ToString();

            return details;
        }
    }
}
