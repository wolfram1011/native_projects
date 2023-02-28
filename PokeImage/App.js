import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

const pokePath = "https://pokeapi.co/api/v2/";
const pokeQuery = "pokemon?limit=151&offset=0";
const firstGenPokemonPath = 'https://pokeapi.co/api/v2/type/13/';

//1 Call Pokemon IDs --> 151 = 152 Calls to the API

export default function App() {
  const [firstGenPokemonDetails, setfirstGenPokemonDetails] = useState([]);

  useEffect(() => {
    const fetchFirstGenPokemons = async () => {
      const firstGenPokemonIdsResponse = await fetch(firstGenPokemonPath);
      const firstGenPokemonIdsBody = await firstGenPokemonIdsResponse.json();

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
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Electric Pokemons</Text>
      <FlatList data={firstGenPokemonDetails} renderItem={renderPokemon} />
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
  pokemonContainer: { backgroundColor: "lightblue", marginTop: 10 },
  pokemonTitle: {
    fontSize: 32,
    alignSelf: "center",
    marginTop: 10,
  },
  pokemonSprite: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
});