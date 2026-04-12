import Groq from 'groq-sdk'
import { createClient } from '@supabase/supabase-js'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    console.log('Sending message:', message)
    console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY)

    if (!message) {
      return new Response(JSON.stringify({ error: 'No message provided' }), {
        status: 400,
      })
    }

    if (!process.env.GROQ_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'GROQ_API_KEY not configured' }),
        { status: 500 }
      )
    }

    // Fetch events from Supabase
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('*')
      .order('datetime', { ascending: true })

    if (eventsError) {
      console.error('Error fetching events:', eventsError)
    }

    // Fetch tasks from Supabase
    const { data: tasks, error: tasksError } = await supabase
      .from('tasks')
      .select('*')

    if (tasksError) {
      console.error('Error fetching tasks:', tasksError)
    }

    // Fetch projects from Supabase
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')

    if (projectsError) {
      console.error('Error fetching projects:', projectsError)
    }

    // Fetch ideas from Supabase
    const { data: ideas, error: ideasError } = await supabase
      .from('ideas')
      .select('*')

    if (ideasError) {
      console.error('Error fetching ideas:', ideasError)
    }

    // Convert events into readable text
    const eventContext = events && events.length > 0
      ? events.map((e: any) =>
          `${e.title} at ${e.datetime ? new Date(e.datetime).toLocaleTimeString() : 'No time'}`
        ).join('\n')
      : 'None'

    // Convert tasks into readable text
    const taskContext = tasks && tasks.length > 0
      ? tasks.map((t: any) =>
          `${t.text} (${t.done ? 'done' : 'pending'})`
        ).join('\n')
      : 'None'

    // Convert projects into readable text
    const projectContext = projects && projects.length > 0
      ? projects.map((p: any) =>
          `${p.title} (${p.status})`
        ).join('\n')
      : 'None'

    // Convert ideas into readable text
    const ideaContext = ideas && ideas.length > 0
      ? ideas.map((i: any) =>
          `${i.text}`
        ).join('\n')
      : 'None'

    console.log('Event context:', eventContext)
    console.log('Task context:', taskContext)
    console.log('Project context:', projectContext)
    console.log('Idea context:', ideaContext)

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are NOVA, an AI assistant inside a productivity OS.

Rules:
- Only use provided data
- Do not make things up
- Keep responses short (max 4 lines)
- Be actionable and direct

User context:

EVENTS:
${eventContext}

TASKS:
${taskContext}

PROJECTS:
${projectContext}

IDEAS:
${ideaContext}

If data is missing, say "No data available"`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
    })

    const reply = completion.choices[0]?.message?.content

    console.log('AI reply:', reply)

    return new Response(JSON.stringify({ reply }), {
      status: 200,
    })
  } catch (error: any) {
    console.error('GROQ ERROR:', error)
    console.error('Error type:', typeof error)
    console.error('Error message:', error?.message)
    console.error('Error string:', String(error))

    const errorMessage =
      error?.message ||
      (typeof error === 'string' ? error : 'Internal server error')

    return new Response(
      JSON.stringify({
        error: errorMessage,
        details: String(error),
      }),
      { status: 500 }
    )
  }
}
