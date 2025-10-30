import { useState, useCallback } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import {
  getNotifications,
  markAllNotificationsAsRead,
  clearAllNotifications,
} from '../utils/store.js'

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const loadNotifications = useCallback(() => {
    const notifs = getNotifications()
    setNotifications(notifs)
    markAllNotificationsAsRead()
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadNotifications()
    }, [loadNotifications])
  )

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    loadNotifications()
    setRefreshing(false)
  }, [loadNotifications])

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            clearAllNotifications()
            setNotifications([])
          },
        },
      ]
    )
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMs = now - date
    const diffInMinutes = Math.floor(diffInMs / 60000)
    const diffInHours = Math.floor(diffInMs / 3600000)
    const diffInDays = Math.floor(diffInMs / 86400000)

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    })
  }

  const renderNotificationCard = ({ item }) => (
    <View
      className={`bg-white rounded-xl p-4 mb-3 shadow-sm ${
        !item.isRead ? 'bg-sky-50 border-l-4 border-blue-500' : ''
      }`}
    >
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-base font-semibold text-black flex-1 mr-2" numberOfLines={2}>
          {item.title}
        </Text>
        {!item.isRead && <View className="w-2 h-2 bg-blue-500 rounded-full mt-1" />}
      </View>
      <Text className="text-sm text-gray-600 mb-2 leading-5" numberOfLines={3}>
        {item.body}
      </Text>
      <Text className="text-xs text-gray-500">{formatDate(item.receivedTime)}</Text>
    </View>
  )

  const renderEmpty = () => (
    <View className="flex-1 justify-center items-center px-8">
      <Text className="text-lg font-semibold text-gray-600 mb-2">No notifications yet</Text>
      <Text className="text-sm text-gray-500 text-center">
        You'll see notifications here when you receive them
      </Text>
    </View>
  )

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-black">Notifications</Text>
        {notifications.length > 0 && (
          <TouchableOpacity onPress={handleClearAll} className="px-3 py-1.5">
            <Text className="text-red-500 text-sm font-semibold">Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderNotificationCard}
        keyExtractor={(item) => item.id}
        contentContainerClassName={notifications.length === 0 ? 'flex-grow' : 'p-4'}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmpty}
      />
    </View>
  )
}

export default NotificationsScreen