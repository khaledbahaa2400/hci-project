import { Injectable } from '@angular/core';

import { Assessment } from '../../models/Assessment';
import { CoursesService } from '../courses-service/courses.service';

@Injectable({
  providedIn: 'root'
})
export class AssessmentsService {
  constructor(private coursesService: CoursesService) { }

  assessments: Assessment[] = [
    new Assessment(1, "intro-midterm-2024-04-27", this.coursesService.courses[5], "online", "midterm", "2024-04-27"),
    new Assessment(1, "intro-quiz-2024-03-27", this.coursesService.courses[5], "online", "quiz", "2024-03-27"),
    new Assessment(1, "intro-practical-2024-05-27", this.coursesService.courses[5], "online", "practical", "2024-05-27"),
    new Assessment(2, "database-midterm-2024-04-27", this.coursesService.courses[4], "online", "midterm", "2024-04-27"),
    new Assessment(2, "database-quiz-2024-03-27", this.coursesService.courses[4], "online", "quiz", "2024-03-27"),
    new Assessment(2, "database-practical-2024-05-27", this.coursesService.courses[4], "online", "practical", "2024-05-27"),
    new Assessment(3, "MM-midterm-2024-04-27", this.coursesService.courses[3], "online", "midterm", "2024-04-27"),
    new Assessment(3, "MM-quiz-2024-03-27", this.coursesService.courses[3], "online", "quiz", "2024-03-27"),
    new Assessment(3, "MM-practical-2024-05-27", this.coursesService.courses[3], "online", "practical", "2024-05-27"),
    new Assessment(4, "SQA-midterm-2024-04-27", this.coursesService.courses[2], "online", "midterm", "2024-04-27"),
    new Assessment(4, "SQA-quiz-2024-03-27", this.coursesService.courses[2], "online", "quiz", "2024-03-27"),
    new Assessment(4, "SQA-practical-2024-05-27", this.coursesService.courses[2], "online", "practical", "2024-05-27"),
    new Assessment(4, "social-midterm-2024-04-27", this.coursesService.courses[1], "online", "midterm", "2024-04-27"),
    new Assessment(4, "social-quiz-2024-03-27", this.coursesService.courses[1], "online", "quiz", "2024-03-27"),
    new Assessment(4, "social-practical-2024-05-27", this.coursesService.courses[1], "online", "practical", "2024-05-27"),
    new Assessment(4, "HCI-midterm-2024-04-27", this.coursesService.courses[0], "online", "midterm", "2024-04-27"),
    new Assessment(4, "HCI-quiz-2024-03-27", this.coursesService.courses[0], "online", "quiz", "2024-03-27"),
    new Assessment(4, "HCI-practical-2024-05-27", this.coursesService.courses[0], "online", "practical", "2024-05-27"),
  ];

  filterAssessmentsByYear(year: number, instructor: string): Assessment[] {
    return this.assessments.filter(assessment => assessment.year === year && assessment.course.instructor === instructor);
  }

  addAssessment(assessment: Assessment) {
    this.assessments.push(assessment);
  }
}
