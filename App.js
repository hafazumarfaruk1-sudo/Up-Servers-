import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [activeSection, setActiveSection] = useState(null);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleOptionClick = (optionName) => {
    setActiveSection(optionName);
  };

  const isDark = theme === 'dark';

  return (
    <SafeAreaView style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* উপরে এক লাইন লেখা: UP Servers */}
      <View style={[styles.upServersBar, isDark ? styles.darkBar : styles.lightBar]}>
        <Text style={[styles.barTitle, isDark ? styles.darkText : styles.lightText]}>UP Servers</Text>
        <TouchableOpacity style={styles.themeBtn} onPress={toggleTheme}>
          <Text style={styles.themeBtnText}>
            {theme === 'light' ? '🌙 ডार्क' : '☀️ লাইট'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* নিচের সম্পূর্ণ স্ক্রিন জায়গা নিয়ে চারটি ভাগ (Grid Layout) */}
      <View style={styles.dashboardGrid}>
        {/* অপশন ১ */}
        <TouchableOpacity 
          style={[styles.dashboardCard, isDark ? styles.darkCard : styles.lightCard]} 
          onPress={() => handleOptionClick('QR code scanner')}
        >
          <Text style={styles.cardIcon}>📷</Text>
          <Text style={[styles.cardTitle, isDark ? styles.darkText : styles.lightText]}>QR code scanner</Text>
          <Text style={styles.cardDesc}>স্ক্যান করে দ্রুত তথ্য নিশ্চিত করুন</Text>
        </TouchableOpacity>

        {/* অপশন ২ */}
        <TouchableOpacity 
          style={[styles.dashboardCard, isDark ? styles.darkCard : styles.lightCard]} 
          onPress={() => handleOptionClick('add new person')}
        >
          <Text style={styles.cardIcon}>➕</Text>
          <Text style={[styles.cardTitle, isDark ? styles.darkText : styles.lightText]}>add new person</Text>
          <Text style={styles.cardDesc}>নতুন ব্যক্তি বা ডেটা যুক্ত করুন</Text>
        </TouchableOpacity>

        {/* অপশন ৩ */}
        <TouchableOpacity 
          style={[styles.dashboardCard, isDark ? styles.darkCard : styles.lightCard]} 
          onPress={() => handleOptionClick('all person list')}
        >
          <Text style={styles.cardIcon}>📋</Text>
          <Text style={[styles.cardTitle, isDark ? styles.darkText : styles.lightText]}>all person list</Text>
          <Text style={styles.cardDesc}>সকল ব্যক্তির তালিকা ও সার্চ করুন</Text>
        </TouchableOpacity>

        {/* অপশন ৪ */}
        <TouchableOpacity 
          style={[styles.dashboardCard, isDark ? styles.darkCard : styles.lightCard]} 
          onPress={() => handleOptionClick('creating all card')}
        >
          <Text style={styles.cardIcon}>🪪</Text>
          <Text style={[styles.cardTitle, isDark ? styles.darkText : styles.lightText]}>creating all card</Text>
          <Text style={styles.cardDesc}>সবগুলোর জন্য কার্ড তৈরি করুন</Text>
        </TouchableOpacity>
      </View>

      {/* ফুটার */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, isDark ? styles.darkSubText : styles.lightSubText]}>
          &copy; ২০২৬ আমার অ্যাপ্লিকেশন। সর্বস্বত্ব সংরক্ষিত।
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#f8f9fa',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  upServersBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 4,
  },
  lightBar: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  darkBar: {
    backgroundColor: '#1e1e2f',
  },
  barTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  themeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#e9ecef',
  },
  themeBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dashboardGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  dashboardCard: {
    width: '48%',
    height: '48%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lightCard: {
    backgroundColor: '#ffffff',
    borderColor: '#e0e0e0',
  },
  darkCard: {
    backgroundColor: '#1e1e1e',
    borderColor: '#333333',
  },
  cardIcon: {
    fontSize: 35,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  lightText: {
    color: '#333333',
  },
  darkText: {
    color: '#ffffff',
  },
  lightSubText: {
    color: '#888888',
  },
  darkSubText: {
    color: '#aaaaaa',
  },
  footer: {
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
  },
});
