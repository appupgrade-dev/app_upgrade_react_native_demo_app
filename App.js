/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

/**
 * Import App Upgrade React Native SDK
 */
import { appUpgradeVersionCheck, AppUpgradeClient } from 'app-upgrade-react-native-sdk';
import type { AppInfo, AlertInfo } from 'app-upgrade-react-native-sdk';
import { Platform } from 'react-native';
import { useEffect, useMemo } from 'react';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const appUpgradeClient = useMemo(() => new AppUpgradeClient({
    apiKey: 'NmRmOWU1MGEtNTFmYi00ZjgyLWI4ZWQtYTU1Nzg0MDBiZjkz',
    debug: true
  }), []);

  const appInfo: AppInfo = useMemo(() => ({
    appId: Platform.OS === 'ios' ? '1234567890' : 'com.google.chrome',
    // iOS: numeric App Store ID (not bundle ID)
    // Android: applicationId / package name
    appName: 'Wallpaper app',
    appVersion: '1.0.1',
    platform: Platform.OS,            // 'android' | 'ios'
    environment: 'production',        // 'production' | 'development'
    appLanguage: 'es',                // Optional — for localized messages
  }), []);

  const alertConfig: AlertInfo = {    // Optional
    title: 'Update Available',
    updateButtonTitle: 'Update Now',
    laterButtonTitle: 'Later..',
    onDismissCallback: () => console.log('Dismissed'),
    onLaterCallback: () => console.log('Later'),
    onUpdateCallback: () => console.log('Updating'),
  };

  useEffect(() => {
    appUpgradeVersionCheck(appUpgradeClient, appInfo, alertConfig);
  }, [appUpgradeClient, appInfo]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
