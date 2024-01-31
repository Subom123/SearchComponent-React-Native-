import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";

const MoviePoster = ({ posterPath }) => {
  const basePosterUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <Image
      style={styles.posterImage}
      source={{ uri: `${basePosterUrl}${posterPath}` }}
    />
  );
};

const HomeScreenCarousel = ({ category }) => {
  return (
    <Carousel
      data={category}
      renderItem={({ item }) => (
        <View style={styles.CategoryViewContainer}>
          <MoviePoster posterPath={item.poster_path} />
          <Text>{item.id}</Text>
          <Text> {item.title}</Text>
        </View>
      )}
      sliderWidth={400}
      itemWidth={200}
      loop
      autoplay
      autoplayInterval={5000} // Adjust the autoplay interval as needed
    />
  );
};

const styles = StyleSheet.create({
  posterImage: {
    width: 150,
    height: 200,
    resizeMode: "contain",
  },
  CategoryViewContainer: {
    flex: 1,
    backgroundColor: "#5DADE2",
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 36,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    marginVertical: 4,
  },
});

export default HomeScreenCarousel;
