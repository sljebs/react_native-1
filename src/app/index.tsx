import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// SectionList-ისთვის მონაცემების სტრუქტურა
const DATA = [
  {
    title: 'ხილი',
    data: ['ვაშლი', 'ბანანი', 'ფორთოხალი'],
  },
  {
    title: 'ბოსტნეული',
    data: ['პომიდორი', 'კიტრი', 'ბულგარული'],
  },
];

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Switch-ის მდგომარეობის შეცვლა
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // Alert-ის გამოძახება
  const showAlert = () => {
    Alert.alert(
      "ყურადღება",
      "ეს არის React Native Alert-ის მაგალითი!",
      [
        { text: "გაუქმება", style: "cancel" },
        { text: "კარგი", onPress: () => console.log("დაჭერილია კარგი") }
      ]
    );
  };

  // ActivityIndicator-ის ჩატვირთვის სიმულაცია
  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>UI კომპონენტების დემო</Text>

      {/* 1. ActivityIndicator კომპონენტი */}
      <View style={styles.section}>
        <Text style={styles.label}>ActivityIndicator (იტვირთება):</Text>
        <TouchableOpacity style={styles.button} onPress={simulateLoading}>
          <Text style={styles.buttonText}>ჩატვირთვის სიმულაცია</Text>
        </TouchableOpacity>
        {isLoading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />}
      </View>

      {/* 2. Switch კომპონენტი */}
      <View style={styles.rowSection}>
        <Text style={styles.label}>Switch: {isEnabled ? 'ჩართული' : 'გამორთული'}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      {/* 3. Alert ღილაკი */}
      <View style={styles.section}>
        <Text style={styles.label}>Alert (შეტყობინება):</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#ff6b6b' }]} onPress={showAlert}>
          <Text style={styles.buttonText}>Alert-ის ჩვენება</Text>
        </TouchableOpacity>
      </View>

      {/* 4. Modal გახსნის ღილაკი */}
      <View style={styles.section}>
        <Text style={styles.label}>Modal (მოდალური ფანჯარა):</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#4dabf7' }]} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Modal-ის გახსნა</Text>
        </TouchableOpacity>
      </View>

      {/* Modal კომპონენტი */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>გამარჯობა! ეს არის Modal ფანჯარა.</Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#fa5252' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>დახურვა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 5. SectionList კომპონენტი */}
      <View style={styles.listWrap}>
        <Text style={styles.label}>SectionList (დაჯგუფებული სია):</Text>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef4ff',
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 18,
    color: '#1f2937',
  },
  section: {
    marginBottom: 14,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  rowSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 6,
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  item: {
    backgroundColor: '#f8fafc',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  itemText: {
    fontSize: 15,
    color: '#1f2937',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 8,
    borderRadius: 8,
    color: '#1d4ed8',
  },
  listWrap: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
  },
  modalText: {
    marginBottom: 18,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    color: '#1f2937',
  },
});