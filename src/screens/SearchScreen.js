import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Text,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const navigation = useNavigation();

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // const getTrendingData = async (query = "") => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `https://api.themoviedb.org/3/${
  //         query ? "search/movie" : "trending/movie/day"
  //       }?api_key=ff78f911e0dbd4c6c56dd3096993fb27`,
  //       {
  //         params: {
  //           ...(query
  //             ? { query, include_adult: false, language: "en-US", page: "1" }
  //             : {}),
  //         },
  //       }
  //     );
  //     setRecords(response.data.results);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setLoading(false);
  // };

  const handleSearch = (search) => {
    setSearchQuery(search);
    filterTrendingData();

    if (!search) {
      fetchTrendingData();
    }
  };

  useEffect(() => {
    fetchTrendingData();
  }, []);

  const fetchTrendingData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/day",
        {
          params: {
            api_key: "ff78f911e0dbd4c6c56dd3096993fb27",
            page: 2,
          },
        }
      );
      setRecords(response.data.results);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const filterTrendingData = () => {
    if (searchQuery) {
      console.log("This is working");
      const filteredData = records.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setRecords(filteredData);
    } else {
      console.log("Here also not working");
      setRecords(records);
    }
  };

  // MoivePosterPath
  const MoviePoster = ({ posterPath }) => {
    const basePosterUrl = "https://image.tmdb.org/t/p/w500";

    return (
      <Image
        style={styles.posterImage}
        source={{ uri: `${basePosterUrl}${posterPath}` }}
      />
    );
  };

  // HighLighting The searchItem
  const highlightSearchQuery = (text) => {
    if (searchQuery && text) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const lowerCaseText = text.toLowerCase();

      let highlightedText = [];

      for (let i = 0; i < lowerCaseText.length; i++) {
        const querySubstring = lowerCaseText.substring(
          i,
          i + lowerCaseQuery.length
        );
        if (querySubstring === lowerCaseQuery) {
          highlightedText.push(
            <Text key={i} style={{ backgroundColor: "yellow", color: "black" }}>
              {text.substring(i, i + lowerCaseQuery.length)}
            </Text>
          );
          i += lowerCaseQuery.length - 1;
        } else {
          highlightedText.push(text[i]);
        }
      }

      return <Text style={styles.titleStyling}>{highlightedText}</Text>;
    } else {
      return <Text style={styles.titleStyling}>{text}</Text>;
    }
  };

  // Trimming the description and adding ... at the last
  const trimTextByWordCount = (text, maxWords = 18) => {
    const words = text.split(" ");

    if (words.length > maxWords) {
      const trimmedText = words.slice(0, maxWords).join(" ") + "...";

      return trimmedText;
    }

    return text;
  };

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScrollView>
        <View>
          <View style={styles.searchBarContainer}>
            <FontAwesome name={"search"} size={30} color="black" />
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Search Your Movies Here"
                placeholderTextColor={"gray"}
                onChangeText={handleSearch}
              />
            </View>
          </View>
          <View style={{ height: 310 }}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color="white"
                style={{ marginTop: 30 }}
              />
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 2, marginTop: 20 }}
              >
                {records.length > 0 ? (
                  records.map((item, index) => (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() =>
                        navigation.navigate("MovieDetailsScreen", {
                          title: item.title,
                          description: item.overview,
                          posterLocation: item.poster_path,
                          release_date: item.release_date,
                        })
                      }
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 10,
                          paddingHorizontal: 20,
                          paddingVertical: 10,
                        }}
                      >
                        <View
                          style={{
                            borderRadius: 10,
                            height: 70,
                            width: 70,
                            overflow: "hidden",
                          }}
                        >
                          <MoviePoster posterPath={item.poster_path} />
                        </View>
                        <View style={{ marginLeft: 18, flex: 1 }}>
                          {highlightSearchQuery(item.title)}
                          <Text
                            style={{
                              fontWeight: "400",
                              color: "gray",

                              fontSize: 16,
                            }}
                          >
                            {item.release_date}
                          </Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  ))
                ) : (
                  <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>No Data Available</Text>
                  </View>
                )}
              </ScrollView>
            )}
          </View>
          {/* Article Section */}
          <View style={styles.ArticleTextContainer}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "700" }}>
              Articles
            </Text>
          </View>
          <View style={{ height: 270 }}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color="white"
                style={{ marginTop: 30 }}
              />
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 2 }}
              >
                {records.length > 0 ? (
                  records.map((item, index) => (
                    <TouchableWithoutFeedback key={index}>
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                          marginTop: 10,
                          paddingHorizontal: 20,
                          paddingVertical: 8,
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View
                            style={{
                              borderRadius: 4,
                              height: 60,
                              width: 60,
                              overflow: "hidden",
                            }}
                          >
                            <MoviePoster posterPath={item.poster_path} />
                          </View>
                          <View style={{ marginLeft: 5, flex: 1 }}>
                            {highlightSearchQuery(item.title)}
                          </View>
                        </View>
                        <View
                          style={{
                            marginTop: 8,
                            marginRight: 20,
                          }}
                        >
                          <Text style={{ color: "#FFFFFF", fontWeight: 300 }}>
                            {trimTextByWordCount(item.overview)}
                          </Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  ))
                ) : (
                  <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>No Data Available</Text>
                  </View>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 20,
    backgroundColor: "white",
    marginHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 4,
  },
  textInputContainer: {
    flex: 1,
    marginLeft: 20,
  },
  safeAreaViewContainer: {
    backgroundColor: "#0B0B0B",
    flex: 1,
  },
  posterImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  titleStyling: {
    color: "white",
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "600",
  },
  ArticleTextContainer: {
    marginTop: 45,
    marginBottom: 10,
    marginHorizontal: 22,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noDataText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SearchScreen;
