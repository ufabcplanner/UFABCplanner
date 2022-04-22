import { IDateProvider } from 'infra/container/providers/DateProvider/IDateProvider';
import { AppError } from 'infra/http/errors/AppError';
import { IAcademicYearRepository } from 'modules/academicYears/repositories/IAcademicYearRepository';
import { injectable, inject } from 'tsyringe';
import { createQuarterDTO } from '../dtos/CreateQuarterDTO';
import { GetQuarterByAcademicYearIdDTO } from '../dtos/GetQuarterByAcademicYearIdDTO';
import { IQuarterRepository } from '../repositories/IQuarterRepository';

@injectable()
export class GetQuarterByAcademicYearIdService {
  constructor(
    @inject('PrismaAcademicYearRepository')
    private academicYearRepository: IAcademicYearRepository,
    @inject('PrismaQuarterRepository')
    private QuarterRepository: IQuarterRepository
  ) {}
  async execute(params: GetQuarterByAcademicYearIdDTO) {
    if (!(await this.academicYearRepository.exists(params.academicYearId))) {
      throw new AppError('Ano acadêmico não existe');
    }

    const quarters = await this.QuarterRepository.getQuarterByAcademicYearId(params.academicYearId);

    return quarters;
  }
}
