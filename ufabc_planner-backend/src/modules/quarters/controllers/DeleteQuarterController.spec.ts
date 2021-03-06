import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, disconnect } from '../../../../test/database';
import { createAcademicYear } from '../../../../test/entities/AcademicYearFactory';
import { createQuarter } from '../../../../test/entities/QuarterFactory';
import { createUser, authenticateUser } from '../../../../test/entities/UserFactory';
import { generateRandomEmail } from '../../../../test/utils';

describe('Delete Quarter (e2e)', () => {
  beforeAll(async () => {
    deleteAll();
  });

  afterAll(async () => {
    disconnect();
  });

  it('should delete a quarter successfully', async () => {
    const user = await createUser();
    const token = await authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);

    const response = await supertest(app)
      .del('/quarters/delete/' + quarter.id)
      .set('authorization', 'Bearer ' + token);

    expect(response.status).toBe(204);
  });
});
