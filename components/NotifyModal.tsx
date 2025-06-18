import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

interface NotifyModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (notificationPrefs: {
    email: boolean;
    phone: boolean;
    emailAddress?: string;
    phoneNumber?: string;
    notificationTiming: {
      oneDayBefore: boolean;
      oneHourBefore: boolean;
      thirtyMinutesBefore: boolean;
      atEventTime: boolean;
    };
  }) => void;
  isNotified: boolean;
  onDelete: () => void;
}

const NotifyModal: React.FC<NotifyModalProps> = ({
  visible,
  onClose,
  onConfirm,
  isNotified,
  onDelete,
}) => {
  const [notificationPrefs, setNotificationPrefs] = useState({
    email: false,
    phone: false,
  });

  const [notificationTiming, setNotificationTiming] = useState({
    oneDayBefore: true,
    oneHourBefore: true,
    thirtyMinutesBefore: false,
    atEventTime: false,
  });

  const [notificationError, setNotificationError] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const internationalRe = /^\+\d{8,15}$/;
    const uruguayRe = /^(0?9\d{7})$/;
    return internationalRe.test(phone) || uruguayRe.test(phone);
  };

  const handleCheckboxChange = (type: keyof typeof notificationPrefs) => {
    setNotificationPrefs(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleTimingChange = (timing: keyof typeof notificationTiming) => {
    setNotificationTiming(prev => ({
      ...prev,
      [timing]: !prev[timing]
    }));
  };

  const handleSubmit = () => {
    let isValid = true;

    if (!notificationPrefs.email && !notificationPrefs.phone) {
      setNotificationError('Email or phone number is required');
      isValid = false;
    }

    if (notificationPrefs.email && !emailAddress) {
      setEmailError('Email is required');
      isValid = false;
    } else if (notificationPrefs.email && !validateEmail(emailAddress)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (notificationPrefs.phone && !phoneNumber) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (notificationPrefs.phone && !validatePhone(phoneNumber)) {
      setPhoneError('Please enter a valid phone number');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (isValid) {
      onConfirm({
        ...notificationPrefs,
        emailAddress: notificationPrefs.email ? emailAddress : undefined,
        phoneNumber: notificationPrefs.phone ? phoneNumber : undefined,
        notificationTiming
      });
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.header}>
              <Text style={styles.title}>Notification Preferences</Text>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#666" />
              </Pressable>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>How would you like to be notified?</Text>
              
              {notificationError ? (
                <Text style={styles.errorText}>{notificationError}</Text>
              ) : null}

              <View style={styles.checkboxContainer}>
                <Pressable
                  style={[styles.checkbox, notificationPrefs.email && styles.checkboxChecked]}
                  onPress={() => handleCheckboxChange('email')}
                >
                  {notificationPrefs.email && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </Pressable>
                <View style={styles.checkboxLabelContainer}>
                  <Text style={styles.checkboxLabel}>Email</Text>
                  {notificationPrefs.email && (
                    <TextInput
                      style={[styles.input, emailError ? styles.inputError : null]}
                      value={emailAddress}
                      onChangeText={setEmailAddress}
                      placeholder="your@email.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  )}
                  {emailError ? (
                    <Text style={styles.errorText}>{emailError}</Text>
                  ) : null}
                </View>
              </View>

              <View style={styles.checkboxContainer}>
                <Pressable
                  style={[styles.checkbox, notificationPrefs.phone && styles.checkboxChecked]}
                  onPress={() => handleCheckboxChange('phone')}
                >
                  {notificationPrefs.phone && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </Pressable>
                <View style={styles.checkboxLabelContainer}>
                  <Text style={styles.checkboxLabel}>SMS/Text Message</Text>
                  {notificationPrefs.phone && (
                    <TextInput
                      style={[styles.input, phoneError ? styles.inputError : null]}
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      placeholder="+1 (123) 456-7890"
                      keyboardType="phone-pad"
                    />
                  )}
                  {phoneError ? (
                    <Text style={styles.errorText}>{phoneError}</Text>
                  ) : null}
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>When should we notify you?</Text>
              
              {Object.entries(notificationTiming).map(([key, value]) => (
                <View key={key} style={styles.checkboxContainer}>
                  <Pressable
                    style={[styles.checkbox, value && styles.checkboxChecked]}
                    onPress={() => handleTimingChange(key as keyof typeof notificationTiming)}
                  >
                    {value && <Ionicons name="checkmark" size={16} color="white" />}
                  </Pressable>
                  <Text style={styles.checkboxLabel}>
                    {key === 'oneDayBefore' && '1 day before the event'}
                    {key === 'oneHourBefore' && '1 hour before the event'}
                    {key === 'thirtyMinutesBefore' && '30 minutes before the event'}
                    {key === 'atEventTime' && 'At the event time'}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.saveButton]}
                onPress={handleSubmit}
              >
                <Text style={[styles.buttonText, styles.saveButtonText]}>Save Preferences</Text>
              </Pressable>
              {isNotified && (
                <Pressable
                  style={[styles.button, styles.deleteButton]}
                  onPress={onDelete}
                >
                  <Text style={[styles.buttonText, styles.deleteButtonText]}>Delete Notification</Text>
                </Pressable>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  closeButton: {
    padding: 5,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#666',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  checkboxLabelContainer: {
    flex: 1,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f2f2f2',
  },
  saveButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: 'white',
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default NotifyModal; 