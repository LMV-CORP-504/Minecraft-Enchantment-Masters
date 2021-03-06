import { Feather } from '@expo/vector-icons'; 
import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, FlatList, ImageBackground, Image} from 'react-native';
import {Button, Header, Card} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import {ObjectsContext} from "../Context/objectsContex";



const { width, height } = Dimensions.get("window");

const WeaponsScreen = ({route, navigation }) => {
  const {Type} = route.params;
  const objectsContext = useContext(ObjectsContext);
  const {objects, refreshObjects, objectType,getObjectype } = objectsContext;

  useEffect(() => {
    const getObject = () => {
      getObjectype(Type)
    };

    getObject();

  });

  let [fontsLoaded] = useFonts({
    Minecraft: require("../fonts/F77MinecraftRegular-0VYv.ttf")
  });

  if (!fontsLoaded) {
    return(
      <View style={{flex: 1, justifyContent: "center", backgroundColor:"#DBDBDB", alignItems: "center"}}>
        <Image source={require("../imagenes/Dancing_Red_Parrot.gif")} ></Image>
      </View>
    );
  };

    return( 
      <View style={{backgroundColor: '#DBDBDB'}}>
        <Header searchBar transparent androidStatusBarColor='#BDBDBD' style={styles.headerStyle}>
          <ImageBackground source={require('../imagenes/banner_madera.png')} style={styles.image}>
            <Image source={require("../imagenes/logo.png")} style={styles.logo} ></Image>
          </ImageBackground>
      </Header>
      <ImageBackground source={require("../imagenes/fondo.png")} style={styles.mainContainer}>
        <TouchableOpacity style={styles.addItem} onPress={() => {navigation.navigate("AddItem")}}>
          <View>
            <Text style={styles.addTittle}>Agregar objeto</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.floatContainer}>
          <FlatList 
            style={styles.principalList}
            data={objectType}
            keyExtractor = {item => item.id.toString()}
            ListEmptyComponent={
              <View style={styles.errorContainer}>
                <Image source={require('../imagenes/Gast.png')} style={styles.GastImage}></Image>
                <Text style={styles.welcomeText}>No tienes ninguna {Type} agregado aun!</Text>
              </View>
            }
            renderItem={({item}) => {

              return(
                <View style={{flexDirection: 'row'}}>
                  <Card transparent style={styles.card}>
                    <ImageBackground source={require('../imagenes/banner_piedra.png')} style={styles.optionImage}>
                      <ImageBackground source={require('../imagenes/marco_objetos.png')} style={styles.marco}>
                        {
                          Type == "Arma" ? 
                          <Image source={require("../imagenes/Espada_Diamante.png")} style={styles.objeto}></Image> :
                          Type == "Armadura" ?
                          <Image source={require("../imagenes/Pechera_Diamante.png")} style={styles.objeto}></Image> :
                          <Image source={require("../imagenes/Pico_Diamante.png")} style={styles.objeto}></Image>
                        }
                      </ImageBackground>
                      <TouchableOpacity style={{flex: 2, width: width/2}} >
                        <ImageBackground source={require('../imagenes/banner_roble_oscuro.png')} style={styles.madera}>
                          <Text style={styles.tittle}>{item.NombreObjeto}</Text>
                          <View style={styles.enchantList}> 
                            <Text style={styles.enchant}>{item.Encantamiento}</Text>
                          </View>
                          <View style={{flexDirection: "row", alignItems: "flex-end", marginLeft: width/4, marginTop: height/25}}>
                            <Text style={styles.enchant}>Eliminar</Text>
                            <Button transparent style={styles.buttonStyle} onPress={() => {navigation.navigate("DropItem",{id : item.id})}}>
                              <Feather name="x" size={24} color="red" />
                            </Button>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                    </ImageBackground>
                  </Card>

                </View>
              )
            }}
            />
        </View>
      </ImageBackground>
      </View>
    );
};

const styles = StyleSheet.create({
  buttonStyle:{
    marginLeft: (width/25) *-1,
  },
  image:{
    width:width,
    flexDirection: "row",
    resizeMode: "contain",
    marginTop: (height/27) * -1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo:{
    width: width/2,
    height: height/12,
    resizeMode: "contain",
    marginTop: height/25
  },

  headerStyle:{
    height: height / 8,
  },

  mainContainer:{
    height: height,
    width: width,
    paddingTop: height/30,
    padding: 10,
    alignItems: "center",
  },

  floatContainer:{
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    height: height/1.5,
    width: width/1.15,
    borderRadius:15,
    alignItems: "center"
  },

  errorContainer:{
    padding: 10,
    width: width/1.8,
    backgroundColor: "#B71D1D",
    marginTop: height/3,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  GastImage:{
    height: height/6,
    width: width/2,
    resizeMode: "contain",
    marginTop: (height/6) * -1,
  },

  welcomeText:{
    fontSize: 20,
    fontFamily: "Minecraft",
    marginTop: 5,
  },

  optionImage:{
    width: width/1.3,
    height: height/7,
    resizeMode: "contain",
    flexDirection: "row",
  },

  item:{
    backgroundColor: "blue",
    borderColor: "black",
  },

  marco:{
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
  },

  madera:{
    paddingTop: 5,
    flex: 2,
    marginBottom: 10,
    marginRight: 10,
    marginTop: 10,
    resizeMode: "contain",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },

  objeto:{
    width: width/7,
    height: height/13,
    resizeMode: "center",
  },

  tittle:{
    fontSize: 20,
    fontFamily: "Minecraft",
    color: "#1ACDF2",
  },

  enchantList:{
    flex: 1,
  },

  enchant:{
    padding: 15,
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: "Minecraft",
  },

  addItem:{
    backgroundColor: "#388233",
    width: width/1.8,
    height: height/15,
    marginBottom: height/50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },

  addTittle:{
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Minecraft",
  }

});

export default WeaponsScreen;
