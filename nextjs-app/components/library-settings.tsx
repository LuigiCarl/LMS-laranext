"use client"

import { useState } from "react"
import { SaveIcon, SettingsIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export function LibrarySettings() {
  const [generalSettings, setGeneralSettings] = useState({
    libraryName: "City Public Library",
    address: "123 Library Street, Booktown, BK 12345",
    phone: "555-123-4567",
    email: "contact@citylibrary.org",
    website: "https://citylibrary.org",
  })

  const [borrowSettings, setBorrowSettings] = useState({
    defaultLoanPeriod: "14",
    maxBooksPerUser: "5",
    allowRenewals: true,
    maxRenewals: "2",
    finePerDay: "0.50",
    gracePeriod: "3",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    sendDueReminders: true,
    reminderDaysBefore: "3",
    sendOverdueNotices: true,
    overdueReminderInterval: "7",
    sendWelcomeEmail: true,
    emailFooter: "Thank you for using City Public Library services.",
  })

  const handleSaveGeneralSettings = () => {
    toast.success("General settings saved successfully")
  }

  const handleSaveBorrowSettings = () => {
    toast.success("Borrowing settings saved successfully")
  }

  const handleSaveNotificationSettings = () => {
    toast.success("Notification settings saved successfully")
  }

  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div className="flex items-center gap-2">
        <SettingsIcon className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Library Settings</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="borrowing">Borrowing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Basic information about your library</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="library-name">Library Name</Label>
                  <Input
                    id="library-name"
                    value={generalSettings.libraryName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, libraryName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={generalSettings.email}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={generalSettings.address}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={generalSettings.phone}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={generalSettings.website}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, website: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneralSettings}>
                <SaveIcon className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="borrowing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Borrowing Rules</CardTitle>
              <CardDescription>Configure how books can be borrowed and returned</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="loan-period">Default Loan Period (days)</Label>
                  <Input
                    id="loan-period"
                    type="number"
                    value={borrowSettings.defaultLoanPeriod}
                    onChange={(e) => setBorrowSettings({ ...borrowSettings, defaultLoanPeriod: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-books">Maximum Books Per User</Label>
                  <Input
                    id="max-books"
                    type="number"
                    value={borrowSettings.maxBooksPerUser}
                    onChange={(e) => setBorrowSettings({ ...borrowSettings, maxBooksPerUser: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="allow-renewals"
                  checked={borrowSettings.allowRenewals}
                  onCheckedChange={(checked) => setBorrowSettings({ ...borrowSettings, allowRenewals: checked })}
                />
                <Label htmlFor="allow-renewals">Allow Renewals</Label>
              </div>

              {borrowSettings.allowRenewals && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="max-renewals">Maximum Renewals Allowed</Label>
                    <Input
                      id="max-renewals"
                      type="number"
                      value={borrowSettings.maxRenewals}
                      onChange={(e) => setBorrowSettings({ ...borrowSettings, maxRenewals: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <Separator />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fine-per-day">Fine Per Day ($)</Label>
                  <Input
                    id="fine-per-day"
                    type="number"
                    step="0.01"
                    value={borrowSettings.finePerDay}
                    onChange={(e) => setBorrowSettings({ ...borrowSettings, finePerDay: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grace-period">Grace Period (days)</Label>
                  <Input
                    id="grace-period"
                    type="number"
                    value={borrowSettings.gracePeriod}
                    onChange={(e) => setBorrowSettings({ ...borrowSettings, gracePeriod: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveBorrowSettings}>
                <SaveIcon className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when notifications are sent to users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="due-reminders"
                  checked={notificationSettings.sendDueReminders}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, sendDueReminders: checked })
                  }
                />
                <Label htmlFor="due-reminders">Send Due Date Reminders</Label>
              </div>

              {notificationSettings.sendDueReminders && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 pl-6">
                  <div className="space-y-2">
                    <Label htmlFor="reminder-days">Days Before Due Date</Label>
                    <Input
                      id="reminder-days"
                      type="number"
                      value={notificationSettings.reminderDaysBefore}
                      onChange={(e) =>
                        setNotificationSettings({ ...notificationSettings, reminderDaysBefore: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="overdue-notices"
                  checked={notificationSettings.sendOverdueNotices}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, sendOverdueNotices: checked })
                  }
                />
                <Label htmlFor="overdue-notices">Send Overdue Notices</Label>
              </div>

              {notificationSettings.sendOverdueNotices && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 pl-6">
                  <div className="space-y-2">
                    <Label htmlFor="overdue-interval">Reminder Interval (days)</Label>
                    <Input
                      id="overdue-interval"
                      type="number"
                      value={notificationSettings.overdueReminderInterval}
                      onChange={(e) =>
                        setNotificationSettings({ ...notificationSettings, overdueReminderInterval: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              <Separator />

              <div className="flex items-center space-x-2">
                <Switch
                  id="welcome-email"
                  checked={notificationSettings.sendWelcomeEmail}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, sendWelcomeEmail: checked })
                  }
                />
                <Label htmlFor="welcome-email">Send Welcome Email to New Users</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-footer">Email Footer Text</Label>
                <Textarea
                  id="email-footer"
                  value={notificationSettings.emailFooter}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, emailFooter: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotificationSettings}>
                <SaveIcon className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
