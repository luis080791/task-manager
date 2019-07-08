import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/observable'

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
}

export class ApiService{
    private URL_REQUEST = 'http://localhost:8080';

    state: Observable<any>;
    task: Observable<any>;
    
    constructor(private http: HttpClient){}

    //States
    getStates(){
        const url = `${this.URL_REQUEST}${'/state'}`;
        return(  
            this.state = this.http.get(url, httpOptions)
        );
    }

    postState(state_name:String){
        const url = `${this.URL_REQUEST}${'/state'}`;
        const body = 
            {
                name: state_name
            }
        return(  
            this.state = this.http.post(url, body, httpOptions)
        );
    }

    putState(state_id: String, state_name:String){
        const url = `${this.URL_REQUEST}${'/state/'}${state_id}`;
        const body = 
            {
                name: state_name,
            }
        return (
            this.state = this.http.put(url, body, httpOptions)
        )
    }


    //Tasks
    postTask(name:String, description:String, estimate: Number, state_id: String){
        const url = `${this.URL_REQUEST}${'/task/'}${state_id}`;
        const body = 
            {
                name: name, 
                description: description,
                estimate: estimate 
            }
        return (
            this.task = this.http.post(url, body, httpOptions)
        )
    }

    putTask(task_id: String, name:String, description:String, estimate: Number, new_state_id: String  ,old_state_id: String){
        const url = `${this.URL_REQUEST}${'/task/'}${task_id}`;
        const body = 
            {
                name: name, 
                description: description,
                estimate: estimate,
                new_state_id :new_state_id,
                old_state_id: old_state_id
            }
        return (
            this.task = this.http.put(url, body, httpOptions)
        )
    }

    deleteTask( task_id: String,  state_id: String){
        console.log(task_id)
        console.log(state_id)
        const url = `${this.URL_REQUEST}${'/task/delete/'}${task_id}`;
        const body = 
            {
                state_id: state_id
            }
        return (
            this.task = this.http.put(url, body, httpOptions)
        )
    }
    

}