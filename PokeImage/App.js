import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image, Linking } from "react-native";

const pokePath = "https://pokeapi.co/api/v2/";
const pokeQuery = "pokemon?limit=151&offset=0";
const firstGenPokemonPath = 'https://pokeapi.co/api/v2/type/13/';

//1 Call Pokemon IDs --> 151 = 152 Calls to the API
const arr = "out";
export default function App() {
  const [firstGenPokemonDetails, setfirstGenPokemonDetails] = useState([]);
  const [pokemonurl,setpokemonurl] = useState([]);
  const [arr,setarr] = useState([]);


  useEffect(() => {
    const fetchFirstGenPokemons = async () => {
      const firstGenPokemonIdsResponse = await fetch(firstGenPokemonPath);
      const firstGenPokemonIdsBody = await firstGenPokemonIdsResponse.json();
      setpokemonurl(firstGenPokemonIdsBody.pokemon);

      const firstGenPokemonDetails = await Promise.all(
        firstGenPokemonIdsBody.pokemon.map(async (p) => {
          const pDetails = await fetch(p.pokemon.url);

          return await pDetails.json();
        })
      );

      setfirstGenPokemonDetails(firstGenPokemonDetails);
    };

    fetchFirstGenPokemons();

  }, []);

  const renderPokemon = ({ item }) => {
    return (
      <View style={styles.pokemonContainer}>
        <Text style={styles.pokemonTitle}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Image
          style={styles.pokemonSprite}
          source={{
            uri: item.sprites.front_default,
          }}
        />
        <Text style = {styles.urlstyle} onPress={() => Linking.openURL(item.pokeurl)}>{item.pokeurl} </Text>
      </View>
    );
  };


const change = (changePoke, addPoke) =>{
  var num = -1;
  changePoke.map((p)=>{
    return arr.push(p.pokemon.url);
  });

  addPoke.map((p) => {
    num+=1;
    return p.pokeurl = arr[num];
  })




};

change(pokemonurl,firstGenPokemonDetails);

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Electric Pokemons</Text>
      <FlatList style= {{alignSelf: 'center'}}numColumns={4} data={firstGenPokemonDetails} renderItem={renderPokemon} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 60,
  },
  title: {
    fontSize: 38,
    alignSelf: "center",
    marginBottom: 20,
  },
  pokemonContainer: {
     backgroundColor: "lightblue",
     marginTop: 10,
     marginLeft: 10,
     width: 300,
     alignSelf: 'center'},
  pokemonTitle: {
    color: 'coral',
    fontSize: 32,
    alignSelf: "center",
    marginTop: 10,
  },
  pokemonSprite: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  urlstyle: {
    alignSelf: "Center",
    textDecorationLine: 'underline',
    color: 'orangered'


  },
});
