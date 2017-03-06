import unittest
from backend.SendEmail import send_confirmation_email
from backend.mail import MockMailSender


class TestSendEmail(unittest.TestCase):


    def setUp(self):

        self.user_adress = "unosuke@gmx.com"
        self.from_address = "no-reply@morpheus.com"
        self.subject = "Account confirmation"
        self.mail_template = "static/templates/useractivation.html"

    def tearDown(self):
        pass

    def test_send_email(self):

        mail_info = {
            'username': "test",
            'user_address': self.user_adress,
            'from_address': self.from_address,
            'subject': self.subject,
            'mail_template': self.mail_template,
            'activation_code': "",
            'auth_url': ""
        }

        mail_sender = MockMailSender("localhost", 25)
        send_confirmation_email(mail_info, mail_sender)


if __name__ == '__main__':
    unittest.main()