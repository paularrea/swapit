import React from "react";
import auth from "./auth-service";	// Importamos funciones para llamadas axios a la API
const { Consumer, Provider } = React.createContext();

// HOC para crear Consumer
const withAuth = (WrappedComponent) => {

    return class extends React.Component {
      render() {
        
        return (
          <Consumer> 
          { 
            ({login, signup, user, logout, isLoggedin, errMessage}) => {
            return (
              <WrappedComponent 
                login={login} 
                signup={signup} 
                user={user}
                logout={logout}
                isLoggedin={isLoggedin}
                errMessage={errMessage}
                {...this.props} />
            );
          }}
          </Consumer>
        );
      }
    };
  };

// Provider
class AuthProvider extends React.Component {
  state = { isLoggedin: false, user: null, isLoading: true, errMessage:"" };

	componentDidMount() {
    auth.me()
    .then((user) => this.setState({ isLoggedin: true, user: user, isLoading: false }))
    .catch((err) => this.setState({ isLoggedin: false, user: null, isLoading: false }));
  }

  signup = (user) => {
    const { username, password, name, lastName } = user;
    
    auth.signup({ username, password, name, lastName })
      .then((user) => this.setState({ isLoggedin: true, user}) )
      .catch(({response}) => this.setState({ message: response.data.statusMessage}));
  };


  login = (user) => {
    const { username, password } = user;

    auth.login({ username, password })
      .then((user) => this.setState({ isLoggedin: true, user }))
      
      .catch(({response}) => this.setState({ errMessage: JSON.stringify(response.data) }))
      this.setState({errMessage:""})
      
  };


  logout = () => {
    auth.logout()
      .then(() => this.setState({ isLoggedin: false, user: null }))
      .catch((err) => console.log(err));
  };

	
  render() {
    const { isLoading, isLoggedin, user, errMessage } = this.state;
    const { login, logout, signup , getProfile} = this;
    console.log(errMessage)
    return (
      isLoading ? 
      <div>Loading</div> 
      :
      (<Provider value={{ isLoggedin, user, login, logout, signup, getProfile, errMessage}} >
         {this.props.children}
      </Provider>)
    )	/*<Provider> "value={}" datos que estarán disponibles para todos los componentes <Consumer> */
  }
}

export { Consumer, withAuth };		//  <--	RECUERDA EXPORTAR  ! ! !

export default AuthProvider;