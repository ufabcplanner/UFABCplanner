import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, disconnect } from '../../../../test/database';
import { createAcademicYear } from '../../../../test/entities/AcademicYearFactory';
import { createClass } from '../../../../test/entities/ClassFactory';
import { createQuarter } from '../../../../test/entities/QuarterFactory';
import { createSubject } from '../../../../test/entities/SubjectFactory';
import { authenticateUser, createUser } from '../../../../test/entities/UserFactory';

describe('Get classes by subject Id (e2e)', () => {
  beforeAll(async () => {
    deleteAll();
  });

  afterAll(async () => {
    disconnect();
  });

  it('Should return a class successfully using the subject id', async () => {
    const user = await createUser();
    const token = await authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);
    const subject = await createSubject(quarter, user);
    const classConst = await createClass(user, subject);

    const response = await supertest(app)
      .get('/classes/get/subject/' + subject.id)
      .set('authorization', 'Bearer ' + token);

    const responseBody = JSON.parse(response.text);

    expect(response.status).toBe(200);
    expect(responseBody.length).toBe(1);
  });
});
