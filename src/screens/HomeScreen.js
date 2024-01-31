import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useState } from "react";
import { movieApiKey } from "../utils/apiKey";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreenFlatlist from "../components/HomeScreenFlatlist";

const HomeScreen = () => {
  const [trending, setTrending] = useState([]);
  const [records, setRecords] = useState([]);

  const getTrendingData = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=ff78f911e0dbd4c6c56dd3096993fb27"
      )
      .then((res) => {
        setRecords(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getTrendingData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>Hello this is testing</Text>
        {/* <HomeScreenFlatlist category={records.results} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
