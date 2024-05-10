import { Injectable } from '@angular/core';
import { Course } from '../../models/Course';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { CourseRegistration } from '../../models/CourseRegistration';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courses: Course[] = [
    new Course('HCI', 'Khaled', 3, 500, 4),
    new Course('social', 'Khaled', 3, 500, 4),
    new Course('SQA', 'Hamdy', 3, 500, 4),
    new Course('MM', 'Jana', 3, 500, 3),
    new Course('database', 'Nada', 3, 500, 2),
    new Course('intro', 'Khaled', 3, 500, 1),
  ];

  addCourse(course: Course) {
    this.courses.push(course);
  }

  filterCoursesByYear(year: number, instructor: string): Course[] {
    return this.courses.filter(course => course.year === year && course.instructor === instructor);
  }

  filterCoursesByInstructor(instructor: string): Course[] {
    return this.courses.filter(course => course.instructor === instructor);
  }
  constructor(private fireStore: Firestore){}
  // coursesobservabel=new Observable<Course[]>((observe)=>{
  //   const coursesCollection=collection(this.fireStore,'courses') ;
  //   const Courses=collectionData(coursesCollection) as Observable<Course[]>;    
  //   observe.next(Courses as unknown as Course[])
  //   observe.complete();
  // })
  getCourses():Observable<Course[]>{
    
    const coursesCollection=collection(this.fireStore,'courses') ;
    const Courses=collectionData(coursesCollection) as Observable<Course[]>;    
    return Courses;
  } 
  getcoursesReg():Observable<CourseRegistration[]>{
    const CourseRegistrationCollection=collection(this.fireStore,'course-registration')
    const CoursesReg=collectionData(CourseRegistrationCollection,{idField:'id'}) as Observable<CourseRegistration[]>;   
    return CoursesReg;
  }
 

 
  updatedatabase( course:CourseRegistration,s:any){
    
    const CourseRegistrationCollection=collection(this.fireStore,'course-registration') 
     
    if(s==="add"){
     
      addDoc(CourseRegistrationCollection,{...course});
    }else{
      const document=doc(CourseRegistrationCollection,course.id);
      updateDoc(document,{...course});
    }
  }
}
