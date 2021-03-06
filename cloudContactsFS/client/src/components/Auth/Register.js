import React , { useState , useEffect } from 'react';
import PropTypes from 'prop-types';
//Redux
import { connect } from 'react-redux';
import { setAlert } from '../../actions/contactsActions';
import { loadUser , register , clearErrors  } from '../../actions/dbActions';

const Register = ({db , setAlert , register  , loadUser , clearErrors , history }) => {
  const [ user , setUser ] = useState({
    name: '' ,
    email: '' ,
    password: '' ,
    password2: ''
  });
  const { name , email , password , password2 } = user;
  const { error , isAuthenticated } = db;
  
  useEffect(() => {
    if(isAuthenticated){
      history.push('/');
    }  

    if(error === 'User already exists'){
      setAlert( error );
      clearErrors();
    } 
    //eslint-disable-next-line
  }, [error , isAuthenticated , history])

  //On Change
  const handleChange = e => {
    setUser({
      ...user ,
      [e.target.name] : e.target.value
    });
  }
  //ON Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //UI
    if( password !== password2 ){
      setAlert('Sorry , passwords don\'t match');
      clearErrors();
    }
    else{
    //To register user ==> check token and login/not the user
      register({ name , email , password }).then( loadUser )
    }
  }
  return (
    <>
    <div className="form-container">
      <h1>Account <span className="text-primary">Register</span></h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            name="name" 
            required
            value={name} 
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            name="email" 
            required
            value={email} 
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password"
            minLength="6" 
            required
            value={password} 
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input 
            type="password" 
            name="password2" 
            minLength="6" 
            required
            value={password2} 
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Register" className="btn btn-success btn-block"/>
      </form>
    </div>
    </>
  )
}

Register.propTypes = {
  loadUser: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
}
const mapStateToProps = state => {
  return {
    db: state.db
  }
}
export default connect(
  mapStateToProps,
  { loadUser , register , setAlert , clearErrors }
)(Register);
