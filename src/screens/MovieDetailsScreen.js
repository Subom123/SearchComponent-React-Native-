import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
export default function MovieDetailsScreen({ route }) {
  const { title, description, posterLocation, release_date } = route.params;
  console.log("This is the posterpath", posterLocation);

  const MoviePoster = ({ posterPath }) => {
    const basePosterUrl = "https://image.tmdb.org/t/p/w500";

    return (
      <ImageBackground
        style={styles.posterImage}
        source={{ uri: `${basePosterUrl}${posterPath}` }}
      >
        <LinearGradient
          colors={["rgba(44, 62, 80, 0.4)", "rgba(0, 0, 0, 0.7)"]}
          style={styles.linearGradient}
        />
      </ImageBackground>
    );
  };

  console.log(release_date);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <MoviePoster posterPath={posterLocation} />
      <View
        style={{
          marginTop: 350,
          backgroundColor: "#0B0B0B",
          flex: 1,
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
        }}
      >
        <View
          style={{
            marginTop: 60,
            marginHorizontal: 40,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "400",
              fontFamily: "Helvetica",
              color: "white",
              marginBottom: 5,
            }}
          >
            {release_date}
          </Text>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "400",
              fontFamily: "Helvetica",
              color: "white",
            }}
          >
            {title}
          </Text>
        </View>

        <View>
          <ScrollView>
            <View style={{ marginHorizontal: 40, flex: 1, marginTop: 35 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  fontFamily: "Helvetica",
                  color: "#909497",
                }}
              >
                {description}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  posterImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  linearGradient: {
    flex: 1,
  },
});
