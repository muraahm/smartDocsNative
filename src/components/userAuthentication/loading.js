import React, { Fragment } from "react";
import { StyleSheet, View, Image } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { loop, bInterpolate } from 'react-native-redash';

const {
  Value,
  Clock,
  useCode,
  set,
} = Animated;

const Logo = () => (
  <View style={styles.logoContainer}>
    <View style={[styles.square, styles.a]} />
    <View style={[styles.square, styles.b]} />
    <View style={[styles.square, styles.c]} />
    <View style={[styles.square, styles.d]} />
  </View>
);


const Loading = () => {

  const clock = new Clock();
  const animation = new Value(0);

  useCode(
    () => (
      set(
        animation,
        loop({
          clock,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          boomerang: true,
          autoStart: true
        })
      )
    ), []
  );



  const scale = bInterpolate(animation, 0.4, 1);
  const rotate = bInterpolate(animation, 0, 2 * Math.PI * 5);

  return (
    <Fragment>
      <Image
        source={require('../../assets/login.png')}
        style={styles.bgImage}
      />
      <Animated.View style={{ ...styles.container, transform: [{ scale }, { rotate }] }}>
        <Logo />
      </Animated.View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bgImage: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    height: null,
    width: null
  },
  logoContainer: {
    width: 200,
    height: 200,
    flexWrap: "wrap",
  },
  square: {
    width: 200 / 2,
    height: 200 / 2,
    borderRadius: 200 * 0.1,
    borderWidth: 5,
    borderColor: "white"
  },
  a: {
    backgroundColor: "#e1d0b3"
  },
  b: {
    backgroundColor: "#e7c651"
  },
  c: {
    backgroundColor: "#cfe1d1"
  },
  d: {
    backgroundColor: "#bfd4e4"
  }
});

export default Loading;