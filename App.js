import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, component, SplashScreen } from 'react';
import ReactDOM from 'react'
import {  ActivityIndicator, FlatList, Button, StyleSheet, Text, TextInput, View, ScrollView, Image, Picker } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import deviceStorage from './deviceStorage'

import { Col, Row, Grid } from 'react-native-easy-grid';


const AuthContext = React.createContext();


 async function fetchApiCallPosts  ()  {
const response =  await fetch("http://192.168.10.127:8080/customers/add", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
    },
     body: JSON.stringify({
    name: 'Jonson',
    surname: 'Wiener',  
    email: 'lol@xd.de',
    password: 'PWSUPER123',
    job: 'BauArbeiter'
    
  })
})
  .then(res => res.json())
  .then(res => console.log(res));

}

async function postAuthorizatedData(url = '', data = {} ) {
  // Default options are marked with *
  try{
    const token = await deviceStorage.getItem('id_token');

  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
  //  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
   // credentials: 'include', // include, *same-origin, omit
    headers: {
      'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': "*",
        'Accept': 'application/json',
        'Content-Type': 'application/json' ,
        'Authorization': 'Bearer ' + token, //http://192.168.10.127:8080
      
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  //  redirect: 'follow', // manual, *follow, error
  //  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });

  return response; // parses JSON response into native JavaScript objects
    } catch(error){
      console.error(error);
    }
}

async function getAuthorizatedData(url = '' ) {
  // Default options are marked with *
  try{
    const token = await deviceStorage.getItem('id_token');

  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
  //  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
   // credentials: 'include', // include, *same-origin, omit
    headers: {
      'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': "*",
        'Accept': 'application/json',
        'Content-Type': 'application/json' ,
        'Authorization': 'Bearer ' + token, //http://192.168.10.127:8080
      
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  //  redirect: 'follow', // manual, *follow, error
  //  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
   // body data type must match "Content-Type" header
  });

  return response; // parses JSON response into native JavaScript objects
    } catch(error){
      console.error(error);
    }
}

async function deleteAuthorizatedData(url = '', data ) {
  // Default options are marked with *
  try{
    const token = await deviceStorage.getItem('id_token');

  const response = await fetch(url, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
  //  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
   // credentials: 'include', // include, *same-origin, omit
    headers: {
      'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': "*",
        'Accept': 'application/json',
        'Content-Type': 'application/json' ,
        'Authorization': 'Bearer ' + token, //http://192.168.10.127:8080
      
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  //  redirect: 'follow', // manual, *follow, error
  //  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
   // body data type must match "Content-Type" header
   body: JSON.stringify(data)
  });

  return response; // parses JSON response into native JavaScript objects
    } catch(error){
      console.error(error);
    }
}

async function postData(url = '', data = {} ) {
  // Default options are marked with *
  try{

  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
  //  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
   // credentials: 'include', // include, *same-origin, omit
    headers: {
      'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': "*",
        'Accept': 'application/json',
        'Content-Type': 'application/json' ,
        //http://192.168.10.127:8080
      
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  //  redirect: 'follow', // manual, *follow, error
  //  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });

  return response; // parses JSON response into native JavaScript objects
    } catch(error){
      console.error(error);
    }
}


function LogoutScreen  ({ navigation }) { 

  const { signOut } = React.useContext(AuthContext);


  const logOut = async () => {
    //deviceStorage.saveItem('id_token', null);
    signOut();

  }

  useEffect(() => {
    
  }, []);


  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Button title='Logout' onPress={logOut}></Button>
      </View>
  );
};


function LoginScreen  ({ navigation }) {
  const [loginPressed, setloginPressed] =  useState(true);
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = React.useContext(AuthContext);


  const getlogin= async (email, password) => {
    try {
      console.log("log");
     const response = await fetch("http://192.168.10.127:8080/api/authentication/login", {
      method: "POST",
      mode: 'cors',
      //credentials: 'same-origin',
      headers: {
        'Access-Control-Allow-Headers': "*",
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      body: JSON.stringify({
        'username': email,
        'password': password })
  })   ;
  const json = await response.json();
  const myToken =  await json.token;
  console.log(myToken); // Pacman
  deviceStorage.saveItem('id_token', myToken);
  
  console.log('id_token');
 console.log( await deviceStorage.getItem('id_token'));
signIn({token: myToken});
console.log('id_token from signIn');
console.log( await signIn.userToken);

   } catch (error) {
    console.log(error);
     console.error(error);
     setLoading(false);
   } finally {
    setLoading(false);
    setloginPressed(false)
   }
   
 }

 const [antwort, setAntwort] = React.useState("");

  useEffect(() => {

  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text> {antwort}</Text>

      <TextInput name = "email" placeholder="Email"  onChangeText={onChangeEmail} value={email}/>
      <TextInput name = "password" placeholder="Password"  onChangeText={onChangePassword} value={password} secureTextEntry />

      <Button onPress= {()=> { getlogin(email, password)
    
      }}

      title= {loginPressed ? "Login" : "Login Nochmal Versuchen?" }>
          </Button>
      
    </View>
  );
};

function HomeScreen  ({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showTheThing , setShowTheThing ] = useState( false);

// Veraltet überarbeiten
const prepare = async() => {

  const log =  await deviceStorage.getItem("logged_in");
  setShowTheThing(await deviceStorage.getItem("logged_in") == "true");
  console.log(log );
  deviceStorage.saveItem("logged_in", false);
  return log

}

  useEffect(() => {
  prepare();
 
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      
   

      <Button
        title="Go to Login"
       onPress={() =>
          navigation.navigate('Login')
        }
          />
          <Button
        title="Go to Logout"
       onPress={() =>
          navigation.navigate('Logout')
        }
          />
          <Button
        title="Go to Register"
       onPress={() =>
          navigation.navigate('Register')
        }
          />
           <Button
        title="Go to Usercontrol"
       onPress={() =>
          navigation.navigate('UserControl')
        }
          />

      <Button
        title="Go to Administation"
       onPress={() =>
          navigation.navigate('Administation')
        }
          />
          
          <Button
        title="Go to Overview"
       onPress={() =>
          navigation.navigate('Overview')
        }
          />
          
          <Button
        title="Go to Projekte"
       onPress={() =>
          navigation.navigate('Projekte')
        }
          /> 

    </View>
  );
};


function RegisterScreen({ navigation })   {
  const [loginPressed, setloginPressed] =  useState(true);
  let [mydata, setMydata] = React.useState({});
  const [data, setData] = useState([]);

  const [name, onChangeName] = React.useState("");
  const [surname, onChangeSurname] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [job, onChangeJob] = React.useState("");
  


  useEffect(() => {
  
  }, []);

  return (

    <View style={styles}>
      <Text>Register Screen</Text>
    
      <TextInput name = "name" placeholder="Name" onChangeText={onChangeName} value={name}/>
      <TextInput name = "surname" placeholder="Vorname"  onChangeText={onChangeSurname} value={surname}/>
      <TextInput name = "email" placeholder="Email"  onChangeText={onChangeEmail} value={email}/>
      <TextInput name = "password" placeholder="Password"  onChangeText={onChangePassword} value={password}/>
      <TextInput name = "job" placeholder="Job/Branche"  onChangeText={onChangeJob} value={job}/>

      <Button onPress= {()=> {setloginPressed(false), postData("http://192.168.10.127:8080/api/customer/registration",{
    name: name,
    surname: surname,  
    email: email,
    password: password,
    job: job
    
  })
      }}
      disabled= {!loginPressed}

      title= {loginPressed ? "Login" : "Login pressed" }>
          </Button>

      <Button
        title="Go to Overview"
       onPress={() =>
          navigation.navigate('Overview')
        }
          />
    </View>
  );
}

function UserControlScreen  ({ navigation }) { 

  const { signOut } = React.useContext(AuthContext);
  const [job, onChangeJob] = React.useState("");
  const [jobList, onChangeJobList] = React.useState([]);

  const getProductList = async (url, method) => {
    //const token = await deviceStorage.getItem('id_token');
    try{
    const response = await fetch(url, {

      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        //'Authentication': `Bearer ${token}`
      },
    });

      const json = await response.json();
      method(json);
      console.log("Test" + json)
    } catch (err){
      console.error(err);
    }

  };

  const renderProductList = (list) => {
    return list.map((product) => {
      return <Picker.Item label={product.name} value={product.name} />
    })
  };


  const deleteAccount = async () => {

    await deleteAuthorizatedData("http://192.168.10.127:8080/api/customer/deregistration");

    signOut();
  }

  const changeJob = async( ) => {
    if (job !=''){
      await postAuthorizatedData("http://192.168.10.127:8080/api/customer/jobchanger" ,job);
    }
    
  }

  useEffect(() => {
    getProductList("http://192.168.10.127:8080/api/fundprogram/jobs", onChangeJobList);
    
  }, []);


  return (
    <View style={{ flex: 1, padding: 24 }}>

      <Picker
        selectedValue={job}
        style={{height: 40, width: 150}}
        onValueChange={(itemValue, itemIndex) => {
          onChangeJob(itemValue);
          console.log(itemValue);
        }}
      >
         <Picker.Item label='Job' value='' ></Picker.Item>
        { renderProductList(jobList)
        }

      </Picker>

      <Button title='Veränderungen Anwenden' onPress={changeJob}></Button>
      <Button title='Account Löschen' color='#880808' onPress={deleteAccount}></Button>
      </View>
  );
};


function AdministrationScreen  ({ navigation }) { 
  const [name, onChangeName] = React.useState("");
  const [description, onChangeDescription] = React.useState("");
  const [url, onChangeUrl] = React.useState("");
  const [foerdersumme, onChangeFoerdersumme] = React.useState("");
  const [foerderbereich, onChangeFoerderbereich] = React.useState([]);
  const [foerderart, onChangeFoerderart] = React.useState([]);
  const [fittingJobs, onChangeFittingJobs] = React.useState([]);
  const [tags, onChangeTags] = React.useState([]);

  const [anzeigen, onChangeAnzeigen] = React.useState(false);

  const [loeschName, onChangeLoeschName,] = React.useState("");
  const [loeschEmailB, onChangeEmailB] = React.useState("");

  const sendFund = async () => {

    const data = {
      name: name,
      description: description,
      url: url,
      foerdersumme: foerdersumme,
      foerderbereich: foerderbereich,
      foerderart: foerderart,
      fittingJobs: fittingJobs,
      tags: tags
    }

    await postAuthorizatedData("http://localhost:8080/api/fundprogram/programadder", data );

  }

  useEffect(() => {
    
  }, []);

 // "{\"name\": \"Programm\", \"description\": \"gutes Programm\", \"url\": \"www.programm.de\", \"foerdersumme\": \"10 Euro bis 20 Euro\", \"foerderbereich\": [\"Privatperson\"], \"foerderart\": [\"Zuschuss\"], \"fittingJobs\": [\"Heizung\"], \"tags\": [\"Zuschuss\", \"Programm\"]}"
  return (
    <View style={{ flex: 1, padding: 24, margin: 10 }}>
      <Button title='Fund Programm Hinzufügen' onPress={  () =>onChangeAnzeigen(!anzeigen)}> </Button>
      
      { anzeigen ? (
        <>
        <TextInput name = 'name' placeholder='Name' onChangeText={onChangeName} value={name}></TextInput>
        <TextInput name = 'beschreibung' placeholder='Beschreibung' onChangeText={onChangeDescription} value={description}></TextInput>
        <TextInput name = 'link' placeholder='Link' onChangeText={onChangeUrl} value={url}></TextInput>
        <TextInput name = 'foedersumme' placeholder='Foerdersumme' onChangeText={onChangeFoerdersumme} value={foerdersumme}></TextInput>
        <TextInput name = 'foederbereich' placeholder='Foerderbereich' onChangeText={onChangeFoerderbereich} value={foerderbereich}></TextInput>
        <TextInput name = 'foederart' placeholder='Foerderart' onChangeText={onChangeFoerderart} value={foerderart}></TextInput>
        <TextInput name = 'passendeJobs' placeholder='Passende Jobs' onChangeText={onChangeFittingJobs} value={fittingJobs}></TextInput>
        <TextInput name = 'passendeTags' placeholder='Passende Tags' onChangeText={onChangeTags} value={tags}></TextInput>
        <Button title='Senden' onPress={ sendFund}> </Button>

        </>
      ) 
      
      : (
        <>
        
        </>
      )
      
      }
      <Button title='Fund Programm Löschen' onPress={() => {if(loeschIdB != null) { postAuthorizatedData("http://localhost:8080/api/fundprogram/programeraser",loeschName);}}} ></Button>
      <TextInput name = 'loeschName' placeholder='Fund Programm Name' onChangeText={onChangeLoeschName} value={loeschName}></TextInput>
      <Button title='Benutzer Löschen' onPress={() => {if(loeschIdB != null) { postAuthorizatedData("http://localhost:8080/api/admin/deregistration",loeschEmailB);}}} ></Button>
      <TextInput name = 'loeschEmailB' placeholder='Benutzer Email' onChangeText={onChangeEmailB} value={loeschEmailB}></TextInput>

      </View>
  );
};


function ProjectsScreen  ({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    const response =  await getAuthorizatedData("http://192.168.10.127:8080/api/customer/favorites");
     const json = await response.json();
     setFavorites(json);
  }

  const Remove = async(vari) => {
    console.log(vari.toString() );
    const string =  vari.toString();
    const mydata = {id: string};
    const response =  await deleteAuthorizatedData("http://192.168.10.127:8080/api/customer/favoriteeraser",mydata) ;
   getFavorites();
  }

  return (
    <View style={styles.container}>

      <Grid>
      {favorites.length > 0 ? (
        <Row style = {styles.listHeader} >  
        <Col ><Text style={styles.item2} >Favoriten </Text> </Col>
        <Col ><Text style={styles.item2} >Name</Text></Col>
        <Col ><Text style={styles.item2} > Foerdersumme </Text></Col>
        <Col ><Text style={styles.item2} >Foederbeschreibung </Text> </Col>
      </Row>

      ) : (
        <>
        
        </>
      )}
      
       
      <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
    
        <Row style = {styles.listCell} > 
        <Col ><Button title='Entfernen' onPress={() => { Remove(item.id);}} value={item.id}></Button></Col>
        <Col ><Text style={styles.item2} >{item.name} </Text></Col>
        <Col ><Text style={styles.item2} > {item.foerdersumme} </Text></Col>
        <Col ><Text style={styles.item2} >{item.description} </Text> </Col>
        
        </Row>
      
      /**{item.name}, {item.foerdersumme}, {item.foederart}, {item.foederbeschreibung} */
          )}
        />
       </Grid>

    </View>
  );
};


function OverviewScreen  ({ navigation }) {
  const [data, setData] = useState([]);
 
  const [keyword, onChangeKeyword] = React.useState("");
  const [sector, onChangeSector] = React.useState("");
  const [type, onChangeType] = React.useState("");
  const [job, onChangeJob] = React.useState(false);

  const [sectorList, setSectorList] = React.useState([]);
  const [typeList, setTypeList] = React.useState([]);

  const getProductList = async (url, method) => {
    //const token = await deviceStorage.getItem('id_token');
    try{
    const response = await fetch(url, {

      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        //'Authentication': `Bearer ${token}`
      },
    });

      const json = await response.json();
      method(json);
      console.log("Test" + json)
    } catch (err){
      console.error(err);
    }

  };

  const renderProductList = (list) => {
    return list.map((product) => {
      return <Picker.Item label={product.name} value={product.name} />
    })
  };

   const Search = async() =>  {
    console.log('id_token in Overview');
    console.log( await deviceStorage.getItem('id_token'));

     // setLoading(true);
    try{
      const mySearchData = {  keyword:   keyword,
                              sector:   sector,
                              type:   type,
                              job:   job };
      const link = 'http://192.168.10.127:8080/api/fundprogram/programs';
      console.log('Link');
      console.log(mySearchData);

     // "{\"keyword\": \"Zuschuss\", \"sector\": \"Energieeffizienz und Erneuerbare Energien\", \"type\": \"Zuschuss\", \"job\": false}"

     const response =  await postAuthorizatedData(link, mySearchData);
     const json =await response.json();
     setData(json);

    }
    catch(error){
        console.log(error);
    }
     
    //setLoading(false);
  
     // <Button title='Suchen' onPress={Search("keyword: " + {search} )}></Button>
 }

 //const [favorID, setFavorID] = React.useState(0);
 const Favorite = async(id) => {
   console.log("favorite" + id );
   const mydata = {id: id};
  const response =  await postAuthorizatedData("http://192.168.10.127:8080/api/customer/favoriteadder",mydata) ;

 }
 
 useEffect(() => {
  getProductList("http://192.168.10.127:8080/api/fundprogram/fundingsectors", setSectorList);
  getProductList("http://192.168.10.127:8080/api/fundprogram/fundingtypes", setTypeList);


}, []);

  return (
<View style={styles.container}>
   <Text > Overview</Text>
    <Picker
        selectedValue={type}
        style={{height: 40, width: 150}}
        onValueChange={(itemValue, itemIndex) => {
          onChangeType(itemValue);
          console.log(itemValue);
        }}
      >
         <Picker.Item label='Type' value='' ></Picker.Item>
        { renderProductList(typeList)
        }

      </Picker>
      <Picker
        selectedValue={sector}
        style={{height: 40, width: 150}}
        onValueChange={(itemValue, itemIndex) => {
          onChangeSector(itemValue);
          console.log(itemValue);
        }}
      >
         <Picker.Item label='Sector' value='' ></Picker.Item>
        { renderProductList(sectorList)
        }

      </Picker>

    <TextInput placeholder='Text' onChangeText={onChangeKeyword} value={keyword}></TextInput>
    <Button title='Suchen' onPress={Search}></Button>
        <View style= {styles.listContainer}></View>
    <Grid>
      {data.length > 0 ? (
         <Row style = {styles.listHeader} >  
        <Col ><Text style={styles.item2} >Favorisieren </Text> </Col>
        <Col ><Text style={styles.item2} >Name</Text></Col>
        <Col ><Text style={styles.item2} > Foerdersumme </Text></Col>
        <Col ><Text style={styles.item2} >Foederbeschreibung </Text> </Col>
      </Row>
      ) :(
        <>
        </>
      )}
      
      <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
    
        <Row style = {styles.listCell} > 
        <Col ><Button title='Favorisieren' onPress={() => { Favorite(item.id);}} value={item.id}></Button></Col>
        <Col ><Text style={styles.item2} >{item.name} </Text></Col>
        <Col ><Text style={styles.item2} > {item.foerdersumme} </Text></Col>
        <Col ><Text style={styles.item2} >{item.description} </Text> </Col>
        
        </Row>
      
      /**{item.name}, {item.foerdersumme}, {item.foederart}, {item.foederbeschreibung} */
          )}
        />
       </Grid>
</View>
  );
 
};


const Stack = createNativeStackNavigator();

function App() {
  

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
     
      switch (action.type) {
        case 'RESTORE_TOKEN':
             return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            role: action.role,
          }; 
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            role: action.role,
          };
        case 'SIGN_OUT':
          deviceStorage.saveItem('id_token', null);
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            role: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      role: null,
    }
  );
   


  React.useEffect(() => {

    
    const bootstrapAsync = async () => {
      let userToken;
      let role;

      try {
        
        userToken = await deviceStorage.getItem('id_token');
        if(userToken != null){
          const tokenjson = {token: userToken  };
          const response = await postData('http://192.168.10.127:8080/api/customer/token', tokenjson);
          const json = await response.json();
          console.log(await json.valid);

         
          if(json.valid == true){
            const responseRole = await getAuthorizatedData("http://192.168.10.127:8080/api/customer/role");
            const jsonRole = await responseRole.json();
            role = await jsonRole.role;
          } else {
             userToken = null;
          }
        }
       
      } catch (e) {
        // Restoring token failed
        userToken = null;
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken, role: role });
    };

    bootstrapAsync();
    
    },[]);
    
  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        let role;
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        const responseRole = await getAuthorizatedData("http://192.168.10.127:8080/api/customer/role");
        const jsonRole = await responseRole.json();
        role = await jsonRole.role;

        dispatch({ type: 'SIGN_IN', token: data.token, role: role });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

       // dispatch({ type: 'SIGN_IN', token: data.token });
      },
    }),
    []
  );
 
  return (
    <AuthContext.Provider value={authContext}>
    
    <NavigationContainer>
      <Stack.Navigator>
      {console.log("Selecting " + state.role  )}
        {state.userToken == null ? (
          <>
         <Stack.Screen name="Home" component={HomeScreen} />
         <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
         <>
          {console.log("Selecting " + state.role  )}
          {state.role == "[ROLE_ADMIN]" ? (
            <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="UserControl" component={UserControlScreen} />
            <Stack.Screen name="Logout" component={LogoutScreen} />
            <Stack.Screen name="Administation" component={AdministrationScreen} />
            <Stack.Screen name="Overview" component={OverviewScreen} />
            <Stack.Screen name="Projekte" component={ProjectsScreen} />
            </>
         ) : (
            <>
           <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="UserControl" component={UserControlScreen} />
            <Stack.Screen name="Logout" component={LogoutScreen} />
            <Stack.Screen name="Overview" component={OverviewScreen} />
           <Stack.Screen name="Projekte" component={ProjectsScreen} />
            </>
         )}
         </> 
         
        )}
        
 
      </Stack.Navigator>
    </NavigationContainer>
    </AuthContext.Provider>
  );

}


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  item2: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  verticalViewLayout: {
    margin: 20,
    flexDirection: 'row',
   
  }, 
  listContainer: {
    width: '100%',
    height: 300,
    padding: 16,
    paddingTop: 100,
    backgroundColor: '#fff',
  },
  listCell: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  listHeader: {
    borderWidth: 10,
    borderColor: '#ddd',
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
});

