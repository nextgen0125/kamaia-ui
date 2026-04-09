'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

// ---------------- Schema ----------------
const taskSchema = z.object({
    type: z.enum(['process', 'attendance']),
    title: z.string().min(2, { message: 'Please enter a title.' }),
    client: z.string().min(2, { message: 'Please enter a client name.' }),
    othersInvolved: z.array(z.string()).optional(),
    processNumber: z.string().optional(),
    assignee: z.string().optional(),
    access: z.enum(['private', 'public', 'involved']).optional(),
    tags: z.array(z.string()).optional(),
    subject: z.string().optional(),
    recentRecord: z.string().optional(),
    description: z.string().optional(),
    dueDate: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
})

// ---------------- Component ----------------
export default function AddTaskPage() {
    const form = useForm<z.infer<typeof taskSchema>>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            type: 'attendance',
            title: '',
            client: '',
            othersInvolved: [],
            tags: [],
            access: 'private',
            priority: 'medium',
        },
    })

    function onSubmit(values: z.infer<typeof taskSchema>) {
        const task = { id: uuidv4(), ...values }
        console.log('Created task:', task)
    }

    return (
        <div className="max-w-3xl mx-auto py-10">
            <Card className="p-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Add Task</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            {/* Type */}
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="process">Process</SelectItem>
                                                <SelectItem value="attendance">Attendance</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Title */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter a task title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Client */}
                            <FormField
                                control={form.control}
                                name="client"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Client</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the client's name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Process number */}
                            <FormField
                                control={form.control}
                                name="processNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Process Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Optional process number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Assignee */}
                            <FormField
                                control={form.control}
                                name="assignee"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Assignee</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Who is responsible?" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Access */}
                            <FormField
                                control={form.control}
                                name="access"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Access</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select access level" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="private">Private</SelectItem>
                                                <SelectItem value="public">Public</SelectItem>
                                                <SelectItem value="involved">Involved only</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Subject */}
                            <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subject</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Subject or summary" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Recent Record */}
                            <FormField
                                control={form.control}
                                name="recentRecord"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Recent Record</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Latest notes or updates" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Task description..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Due Date */}
                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Due Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Priority */}
                            <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Priority</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select priority" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-4">
                                <Button type="button" variant="secondary">
                                    Cancel
                                </Button>
                                <Button type="submit">Save Task</Button>
                            </div>

                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
