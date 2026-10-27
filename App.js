import { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const services = [
  {
    name: "জন্ম নিবন্ধন",
    category: "নাগরিক",
    icon: "জ",
    description: "জন্ম নিবন্ধন আবেদন, সংশোধন ও সনদ সংগ্রহের তথ্য।",
    documents: ["শিশুর টিকাকার্ড বা হাসপাতালের ছাড়পত্র", "পিতা-মাতার জাতীয় পরিচয়পত্র", "ঠিকানার প্রমাণ"],
    office: "ইউনিয়ন পরিষদ বা পৌরসভার জন্ম ও মৃত্যু নিবন্ধক।",
  },
  {
    name: "নাগরিক সনদ",
    category: "নাগরিক",
    icon: "ন",
    description: "স্থানীয় নাগরিকত্ব ও স্থায়ী ঠিকানার প্রত্যয়নপত্র।",
    documents: ["জাতীয় পরিচয়পত্র বা জন্ম নিবন্ধন", "পাসপোর্ট সাইজের ছবি", "ওয়ার্ড সদস্যের প্রত্যয়ন (প্রযোজ্য ক্ষেত্রে)"],
    office: "নিজ এলাকার ইউনিয়ন পরিষদ বা পৌরসভা কার্যালয়।",
  },
  {
    name: "নামজারি ও ভূমি সেবা",
    category: "ভূমি",
    icon: "ভূ",
    description: "জমির নামজারি, খতিয়ান ও ভূমি উন্নয়ন কর বিষয়ে তথ্য।",
    documents: ["দলিলের কপি", "সর্বশেষ খতিয়ান", "জাতীয় পরিচয়পত্র ও মোবাইল নম্বর"],
    office: "উপজেলা ভূমি অফিস; অনলাইন আবেদনের জন্য land.gov.bd।",
  },
  {
    name: "ট্রেড লাইসেন্স",
    category: "ব্যবসা",
    icon: "ব্য",
    description: "নতুন ব্যবসার লাইসেন্স ও নবায়নের প্রয়োজনীয় নির্দেশনা।",
    documents: ["জাতীয় পরিচয়পত্র", "ব্যবসা প্রতিষ্ঠানের ঠিকানার প্রমাণ", "ছবি ও হালনাগাদ করের রসিদ"],
    office: "ব্যবসা প্রতিষ্ঠানের ঠিকানার স্থানীয় সরকার কার্যালয়।",
  },
  {
    name: "বয়স্ক ভাতা",
    category: "সামাজিক",
    icon: "স",
    description: "বয়স্ক ভাতার যোগ্যতা, আবেদন ও প্রয়োজনীয় তথ্য।",
    documents: ["জাতীয় পরিচয়পত্র বা জন্ম নিবন্ধন", "সক্রিয় মোবাইল নম্বর", "ব্যাংক বা মোবাইল আর্থিক সেবার হিসাব"],
    office: "উপজেলা সমাজসেবা কার্যালয় বা ইউনিয়ন ডিজিটাল সেন্টার।",
  },
  {
    name: "ওয়ারিশ সনদ",
    category: "নাগরিক",
    icon: "ও",
    description: "উত্তরাধিকারী সনদের আবেদন ও যাচাই সংক্রান্ত তথ্য।",
    documents: ["মৃত্যু নিবন্ধন সনদ", "ওয়ারিশদের জাতীয় পরিচয়পত্র বা জন্ম নিবন্ধন", "সম্পর্কের প্রমাণপত্র (প্রযোজ্য ক্ষেত্রে)"],
    office: "ইউনিয়ন পরিষদ বা পৌরসভার সংশ্লিষ্ট ওয়ার্ড কার্যালয়।",
  },
];

const categories = ["সব সেবা", "নাগরিক", "ভূমি", "ব্যবসা", "সামাজিক"];

function toBanglaDigits(value) {
  return String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
}

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("সব সেবা");
  const [selectedService, setSelectedService] = useState(null);

  const visibleServices = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("bn");
    return services.filter((service) => {
      const matchesCategory = category === "সব সেবা" || service.category === category;
      const searchableText = `${service.name} ${service.category} ${service.description}`.toLocaleLowerCase("bn");
      return matchesCategory && searchableText.includes(normalizedQuery);
    });
  }, [category, query]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>উ</Text>
          </View>
          <View>
            <Text style={styles.brandName}>UP Service</Text>
            <Text style={styles.brandCaption}>উপজেলার সেবা, আপনার হাতেই</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>আপনার এলাকার ডিজিটাল সেবা</Text>
          <Text style={styles.title}>
            আপনার সেবা,{"\n"}
            <Text style={styles.titleAccent}>আপনার হাতেই।</Text>
          </Text>
          <Text style={styles.heroDescription}>
            উপজেলার প্রয়োজনীয় সরকারি ও নাগরিক সেবা খুঁজুন এক জায়গায়।
          </Text>
        </View>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionTitle}>সেবাসমূহ</Text>
            <Text style={styles.sectionDescription}>প্রয়োজনীয় সেবাটি বেছে নিন</Text>
          </View>
          <Text style={styles.serviceCount}>{toBanglaDigits(visibleServices.length)} টি</Text>
        </View>

        <TextInput
          accessibilityLabel="সেবার নাম লিখে খুঁজুন"
          placeholder="সেবার নাম লিখে খুঁজুন..."
          placeholderTextColor={colors.muted}
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
          returnKeyType="search"
        />

        <ScrollView
          horizontal
          contentContainerStyle={styles.categoryList}
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((item) => {
            const isSelected = category === item;
            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                key={item}
                onPress={() => setCategory(item)}
                style={[styles.categoryChip, isSelected && styles.categoryChipSelected]}
              >
                <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.serviceList}>
          {visibleServices.map((service) => (
            <Pressable
              accessibilityRole="button"
              key={service.name}
              onPress={() => setSelectedService(service)}
              style={({ pressed }) => [styles.serviceCard, pressed && styles.serviceCardPressed]}
            >
              <View style={styles.serviceCardTop}>
                <View style={styles.serviceIcon}>
                  <Text style={styles.serviceIconText}>{service.icon}</Text>
                </View>
                <Text style={styles.serviceCategory}>{service.category}</Text>
              </View>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
              <Text style={styles.detailsLink}>বিস্তারিত জানুন  →</Text>
            </Pressable>
          ))}
          {visibleServices.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>কোনো সেবা পাওয়া যায়নি</Text>
              <Text style={styles.emptyDescription}>অন্য কোনো শব্দ দিয়ে খুঁজে দেখুন।</Text>
            </View>
          )}
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>সঠিক তথ্যের জন্য</Text>
          <Text style={styles.noticeText}>
            আবেদন করার আগে সংশ্লিষ্ট দপ্তর থেকে কাগজপত্র ও ফি নিশ্চিত করে নিন।
          </Text>
          <Text style={styles.noticePhone}>জাতীয় তথ্যসেবা: ৩৩৩</Text>
        </View>

        <Text style={styles.footer}>UP Service · সেবার তথ্য সংশ্লিষ্ট দপ্তর থেকে যাচাই করুন</Text>
      </ScrollView>

      <Modal
        animationType="slide"
        onRequestClose={() => setSelectedService(null)}
        transparent
        visible={selectedService !== null}
      >
        <View style={styles.modalBackdrop}>
          <Pressable
            accessibilityLabel="বিস্তারিত বন্ধ করুন"
            accessibilityRole="button"
            onPress={() => setSelectedService(null)}
            style={StyleSheet.absoluteFill}
          />
          {selectedService && (
            <View style={styles.modalCard}>
              <View style={styles.modalHandle} />
              <Text style={styles.modalCategory}>{selectedService.category} সেবা</Text>
              <Text style={styles.modalTitle}>{selectedService.name}</Text>
              <Text style={styles.modalDescription}>{selectedService.description}</Text>
              <Text style={styles.modalSubheading}>প্রয়োজনীয় কাগজপত্র</Text>
              {selectedService.documents.map((document) => (
                <Text key={document} style={styles.documentItem}>•  {document}</Text>
              ))}
              <Text style={styles.modalSubheading}>কোথায় যোগাযোগ করবেন</Text>
              <Text style={styles.modalDescription}>{selectedService.office}</Text>
              <Text style={styles.modalNote}>
                ফি ও প্রক্রিয়া সময়ভেদে পরিবর্তিত হতে পারে—দপ্তর থেকে নিশ্চিত হয়ে নিন।
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => setSelectedService(null)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>বন্ধ করুন</Text>
              </Pressable>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const colors = {
  background: "#f7f8f3",
  green: "#245c43",
  deepGreen: "#174430",
  text: "#263d2e",
  muted: "#879087",
  line: "#e7ebe3",
  white: "#ffffff",
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 32 },
  header: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 24 },
  brandMark: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 3,
    backgroundColor: colors.green,
  },
  brandMarkText: { color: colors.white, fontSize: 23, fontWeight: "700" },
  brandName: { color: colors.text, fontSize: 17, fontWeight: "700" },
  brandCaption: { marginTop: 1, color: colors.muted, fontSize: 11 },
  hero: { padding: 20, borderRadius: 12, backgroundColor: "#eef2e8" },
  eyebrow: { color: "#68796d", fontSize: 12, fontWeight: "600" },
  title: { marginTop: 10, color: "#203d2c", fontSize: 34, fontWeight: "700", lineHeight: 43 },
  titleAccent: { color: "#668648" },
  heroDescription: { marginTop: 8, color: "#737d73", fontSize: 13, lineHeight: 21 },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 27,
    marginBottom: 13,
  },
  sectionTitle: { color: colors.text, fontSize: 21, fontWeight: "700" },
  sectionDescription: { marginTop: 2, color: colors.muted, fontSize: 12 },
  serviceCount: { color: "#547343", fontSize: 13, fontWeight: "600" },
  searchInput: {
    height: 46,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    backgroundColor: colors.white,
    color: colors.text,
    fontSize: 13,
  },
  categoryList: { gap: 8, paddingVertical: 13 },
  categoryChip: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 7,
    backgroundColor: colors.white,
  },
  categoryChipSelected: { borderColor: colors.green, backgroundColor: colors.green },
  categoryText: { color: "#788276", fontSize: 12 },
  categoryTextSelected: { color: colors.white, fontWeight: "600" },
  serviceList: { gap: 10 },
  serviceCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 9,
    backgroundColor: colors.white,
  },
  serviceCardPressed: { opacity: 0.8 },
  serviceCardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  serviceIcon: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#edf2df",
  },
  serviceIconText: { color: "#66814e", fontSize: 15, fontWeight: "700" },
  serviceCategory: {
    overflow: "hidden",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 5,
    backgroundColor: "#f4f6f0",
    color: "#778371",
    fontSize: 10,
  },
  serviceName: { marginTop: 12, color: "#304337", fontSize: 16, fontWeight: "700" },
  serviceDescription: { marginTop: 3, color: colors.muted, fontSize: 12, lineHeight: 18 },
  detailsLink: { marginTop: 10, color: "#547343", fontSize: 12, fontWeight: "600" },
  emptyState: { alignItems: "center", paddingVertical: 35 },
  emptyTitle: { color: colors.text, fontSize: 17, fontWeight: "600" },
  emptyDescription: { marginTop: 5, color: colors.muted, fontSize: 12 },
  notice: { marginTop: 22, padding: 16, borderRadius: 9, backgroundColor: "#eef2e8" },
  noticeTitle: { color: colors.text, fontSize: 14, fontWeight: "700" },
  noticeText: { marginTop: 5, color: "#788276", fontSize: 12, lineHeight: 19 },
  noticePhone: { marginTop: 9, color: colors.green, fontSize: 13, fontWeight: "700" },
  footer: { marginTop: 20, color: "#929a90", fontSize: 10, textAlign: "center" },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(22, 38, 27, 0.42)",
  },
  modalCard: {
    paddingHorizontal: 22,
    paddingTop: 13,
    paddingBottom: 28,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: colors.background,
  },
  modalHandle: {
    alignSelf: "center",
    width: 38,
    height: 4,
    marginBottom: 17,
    borderRadius: 3,
    backgroundColor: "#d5dcd1",
  },
  modalCategory: { color: "#77866e", fontSize: 12 },
  modalTitle: { marginTop: 3, color: colors.text, fontSize: 24, fontWeight: "700" },
  modalDescription: { marginTop: 6, color: "#788276", fontSize: 13, lineHeight: 20 },
  modalSubheading: { marginTop: 17, marginBottom: 5, color: "#455747", fontSize: 13, fontWeight: "700" },
  documentItem: { marginTop: 4, color: "#788276", fontSize: 12, lineHeight: 18 },
  modalNote: { marginTop: 14, color: "#929a8f", fontSize: 11, lineHeight: 17 },
  closeButton: {
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 7,
    backgroundColor: colors.green,
  },
  closeButtonText: { color: colors.white, fontSize: 14, fontWeight: "600" },
});
