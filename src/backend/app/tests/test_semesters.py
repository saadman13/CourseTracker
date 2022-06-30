from .test_setup import TestSetup
from app.models import CustomUser, Semester


class TestSemesters(TestSetup):

    @classmethod
    def setUpTestData(cls):
        super(TestSemesters, cls).setUpTestData()
        password = 'testing'
        cls.user_creds = {
            'email': 'test00@gmail.com',
            'password': password
        }

        cls.user = CustomUser.objects.create(email='test00@gmail.com')
        cls.user.set_password(password)
        cls.user.save()


    def test_post_semester(self):
        res_token = self.client.post(
            self.obtain_token_url,
            self.user_creds,
            format="json")

        res = self.client.post(
                self.semester_url,
                {"semester_name": 'Fall 2021', "user_id": self.user.id},
                HTTP_AUTHORIZATION="JWT " + res_token.data['access'],
                format="json")

        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data['semester_name'], 'Fall 2021')
        db_request = Semester.objects.get(id=res.data['semester_id'])
        self.assertEqual('Fall 2021', db_request.name)

    def test_get_semester(self):
        res_token = self.client.post(
            self.obtain_token_url,
            self.user_creds,
            format="json")

        self.add_semesters_to_user(self.user)

        res = self.client.get(
                self.semester_url,
                {"user_id": self.user.id},
                HTTP_AUTHORIZATION="JWT " + res_token.data['access'],
                format="json")

        import pdb; pdb.set_trace()

        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data['semester_name'], 'Fall 2021')
        db_request = Semester.objects.get(id=res.data['semester_id'])
        self.assertEqual('Fall 2021', db_request.name)
        import pdb; pdb.set_trace()

    def add_semesters_to_user(self,user):
        sem_names = ['Fall 2021', 'Winter 2020', 'Summer 2023']
        for name in sem_names: 
            Semester.objects.create(name=name,made_by=user)