import request from 'superagent';


class HomeController{

    onMount =(thisParent) =>{
        // if(cookies.get('jwt')==undefined){
        //     thisParent.props.history.push('/login');
        // }
    }

    handleItemClick = (thisParent, name) =>{
        thisParent.setState({ activeItem: name });
        window.location.href="#"+name ;
    };

}

export default (new HomeController);
