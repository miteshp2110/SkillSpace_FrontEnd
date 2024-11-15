import AdminRouter from "../components/admin/AdminRouter";
import StudentRouter from "../components/student/StudentRouter";
import TeacherRouter from "../components/teacher/TeacherRouter";
import CommonRouter from "../components/common/CommonRouter";

export function setRole(role){
    localStorage.setItem("role",role.toLowerCase());
}

export function getRole(){
    return localStorage.getItem("role");
}

export function routerAdapter(){
    let role = getRole()

    switch(role){
        case "admin":
            return <AdminRouter />
        case "student":
            return <StudentRouter />
        case "teacher":
            return <TeacherRouter />
        default:
            return <CommonRouter />
    }
}