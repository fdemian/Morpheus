class MockMailSender:

    def __init__(self, host, port):
        self.host = host
        self.port = port

    def send(self, sender, recipient, message):
        print("Email sent")
        print("Host:" + self.host)
        print("Port:" + self.port)
        print("=================")
        print("From: " + sender)
        print("To: " + recipient)
        print("Message: ", end="\n")
        print(message)
