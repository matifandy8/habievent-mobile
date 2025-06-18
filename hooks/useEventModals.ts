import { Event } from "@/types/events";
import { useState } from "react";

export const useEventModals = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [notifyModalVisible, setNotifyModalVisible] = useState(false);
  const [selectedEventForEdit, setSelectedEventForEdit] = useState<Event | null>(null);
  const [selectedEventIdForNotify, setSelectedEventIdForNotify] = useState<string | null>(null);

  const openAddModal = () => setAddModalVisible(true);
  const closeAddModal = () => setAddModalVisible(false);

  const openEditModal = (event: Event) => {
    setSelectedEventForEdit(event);
    setEditModalVisible(true);
  };
  const closeEditModal = () => {
    setSelectedEventForEdit(null);
    setEditModalVisible(false);
  };

  const openNotifyModal = (eventId: string) => {
    setSelectedEventIdForNotify(eventId);
    setNotifyModalVisible(true);
  };
  const closeNotifyModal = () => {
    setSelectedEventIdForNotify(null);
    setNotifyModalVisible(false);
  };

  return {
    addModalVisible,
    editModalVisible,
    notifyModalVisible,
    selectedEventForEdit,
    selectedEventIdForNotify,
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    openNotifyModal,
    closeNotifyModal,
  };
};