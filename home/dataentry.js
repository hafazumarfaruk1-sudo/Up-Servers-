import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  Alert 
} from 'react-native';
import { MMKV } from 'react-native-mmkv';

// ১. এমএমকেভি (MMKV) ইনস্ট্যান্স ইনিশিয়ালাইজ করা (সুপার ফাস্ট লোকাল স্টোরেজ)
const storage = new MMKV();
const STORAGE_KEY = 'persistent_numbers_data';

export default function DataEntryScreen() {
  const [inputNumber, setInputNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [numbersList, setNumbersList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  // ২. অ্যাপ চালুর সাথে সাথে লোকাল ডেটাবেস থেকে পূর্বের সেভ করা ডেটা লোড করা
  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = () => {
    try {
      const savedData = storage.getString(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setNumbersList(parsedData);
        setFilteredList(parsedData);
      }
    } catch (error) {
      console.error('ডেটা লোড করতে সমস্যা হয়েছে:', error);
    }
  };

  // ৩. নতুন নম্বর এন্ট্রি বা ইনপুট করার ফাংশন (সর্বোচ্চ ২০০০টি লিমিট সহ)
  const handleAddNumber = () => {
    if (!inputNumber.trim()) {
      Alert.alert('সতর্কতা', 'দয়া করে একটি নম্বর লিখুন!');
      return;
    }

    if (numbersList.length >= 2000) {
      Alert.alert('লিমিট পূর্ণ', 'সর্বোচ্চ ২০০০টি নম্বরের সীমা পূর্ণ হয়ে গেছে!');
      return;
    }

    // ডুপ্লিকেট চেক (ঐচ্ছিক)
    const isExist = numbersList.some(item => item.number === inputNumber.trim());
    if (isExist) {
      Alert.alert('সতর্কতা', 'এই নম্বরটি ইতিমধ্যে তালিকায় রয়েছে!');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      number: inputNumber.trim(),
      createdAt: new Date().toLocaleTimeString()
    };

    const updatedList = [newItem, ...numbersList];
    setNumbersList(updatedList);
    setFilteredList(updatedList);

    // লোকাল ডেটাবেসে পার্মানেন্টলি সেভ করা
    storage.set(STORAGE_KEY, JSON.stringify(updatedList));
    setInputNumber('');
  };

  // ৪. মিলিিসেকেন্ডের মধ্যে যেকোনো নম্বর খুঁজে বের করার সার্চ সিস্টেম
  const handleSearch = useCallback((text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setFilteredList(numbersList);
      return;
    }

    // ইন-মেমোরি বা লোকাল ডেটা থেকে ফিল্টার করা
    const results = numbersList.filter(item => 
      item.number.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredList(results);
  }, [numbersList]);

  // ৫. ডেটা ডিলিট বা রিসেট করার ফাংশন (প্রয়োজনে ব্যবহার করতে পারেন)
  const handleClearAll = () => {
    Alert.alert(
      'সব ডেটা মুছে ফেলবেন?',
      'এটি নিশ্চিত করলে সমস্ত সংরক্ষিত নম্বর মুছে যাবে।',
      [
        { text: 'বাতিল', style: 'cancel' },
        { 
          text: 'হ্যাঁ, মুছুন', 
          style: 'destructive',
          onPress: () => {
            storage.delete(STORAGE_KEY);
            setNumbersList([]);
            setFilteredList([]);
          }
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <Text style={styles.headerTitle}>নম্বর এন্ট্রি ও লোকাল ডেটাবেস সিস্টেম</Text>
      <Text style={styles.counterText}>মোট সংরক্ষিত নম্বর: {numbersList.length} / ২০০০</Text>

      {/* ডেটা ইনপুট সেকশন */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="নতুন নম্বর লিখুন (যেমন: 017...)"
          value={inputNumber}
          onChangeText={setInputNumber}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAddNumber}>
          <Text style={styles.btnText}>সংরক্ষণ</Text>
        </TouchableOpacity>
      </View>

      {/* সার্চ বক্স সেকশন */}
      <TextInput
        style={styles.searchInput}
        placeholder="নম্বর দিয়ে ইনস্ট্যান্ট সার্চ করুন..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={styles.listHeaderRow}>
        <Text style={styles.listHeaderTitle}>ফলাফলের তালিকা ({filteredList.length}টি)</Text>
        {numbersList.length > 0 && (
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={styles.clearText}>সব মুছুন</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* অপ্টিমাইজড লিস্ট রেন্ডারিং */}
      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.indexText}>#{index + 1}</Text>
            <Text style={styles.numberText}>{item.number}</Text>
            <Text style={styles.timeText}>{item.createdAt}</Text>
          </View>
        )}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
        contentContainerStyle={styles.listContainer}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  counterText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  addBtn: {
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  searchInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  listHeaderTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#495057',
  },
  clearText: {
    color: '#dc3545',
    fontWeight: '600',
    fontSize: 14,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  indexText: {
    fontSize: 14,
    color: '#adb5bd',
    fontWeight: 'bold',
    width: 40,
  },
  numberText: {
    fontSize: 16,
    color: '#212529',
    fontWeight: '500',
    flex: 1,
  },
  timeText: {
    fontSize: 12,
    color: '#6c757d',
  },
});
