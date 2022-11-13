using Humanizer;
using Microsoft.Extensions.Options;
using System;
using System.Configuration;
using Twilio;
using Twilio.Exceptions;
using Twilio.Rest.Api.V2010.Account;
using Twilio.TwiML.Messaging;
using Twilio.Types;

namespace Gardenity.Services
{
    public interface INotificationSender
    {
        public Task<MessageResource> SendText(string to, string body);
    }

    public class NotificationSender : INotificationSender
    {
        private readonly string _accountSid;
        private readonly string _authToken;
        private readonly string _phoneNumber;

        public NotificationSender(IOptions<SendNotificationSettings> settings)
        {
            this._accountSid = settings.Value.AccountSid;
            this._authToken = settings.Value.AuthToken;
            this._phoneNumber = settings.Value.PhoneNumber;

            if (this._accountSid != null && this._authToken != null)
            {
                TwilioClient.Init(this._accountSid, this._authToken);
            }
        }

        public async Task<MessageResource> SendText(string to, string body)
        {
            return await MessageResource.CreateAsync(
                from: new PhoneNumber(this._phoneNumber),
                to: new PhoneNumber(to),
                body: body);
        }
    }

    public class SendNotificationSettings
    {
        public const string Label = "SendNotificationSettings";

        public string AccountSid { get; set; }
        public string AuthToken { get; set; }
        public string PhoneNumber { get; set; }
    }
}
