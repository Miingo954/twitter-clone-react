import { useMemo, useState } from 'react'
import { HashRouter, Link, NavLink, useLocation } from 'react-router-dom'
import './App.css'

const people = {
  jamal: {
    name: 'Jamal Ferguson',
    handle: '@miingo954',
    photo: '/profiles/jamal-london.jpeg',
  },
  maya: {
    name: 'Maya Chen',
    handle: '@mayacodes',
    photo:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=85',
  },
  alicia: {
    name: 'Alicia Park',
    handle: '@aliciapark',
    photo:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=85',
  },
  dev: {
    name: 'Dev Dispatch',
    handle: '@devdispatch',
    photo:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=85',
  },
  jordan: {
    name: 'Jordan Lee',
    handle: '@jordlee',
    photo:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=200&q=85',
  },
  nina: {
    name: 'Nina Patel',
    handle: '@ninapatel',
    photo:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=85',
  },
  omar: {
    name: 'Omar Williams',
    handle: '@omarbuilds',
    photo:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=85',
  },
  serena: {
    name: 'Serena Brooks',
    handle: '@serenabrooks',
    photo:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=85',
  },
  marcus: {
    name: 'Marcus Green',
    handle: '@marcusgreen',
    photo:
      'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=200&q=85',
  },
  alex: {
    name: 'Alex Rivera',
    handle: '@alexrivera',
    photo:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=85',
  },
}

const starterPosts = [
  {
    id: 'design-systems',
    person: 'maya',
    time: '18m',
    body: 'A good component system is not about making every screen look identical. It is about making the important choices consistent.',
    replies: 12,
    reposts: 34,
    likes: 289,
  },
  {
    id: 'portfolio',
    person: 'jamal',
    time: '42m',
    body: 'Building in public today: polished two streaming-app portfolio projects and starting a responsive social feed next. The small interaction details are where the learning happens.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85',
    replies: 8,
    reposts: 19,
    likes: 176,
  },
  {
    id: 'frontend',
    person: 'alicia',
    time: '1h',
    body: 'Frontend reminder: accessibility and responsiveness are features, not the final checklist item.',
    replies: 21,
    reposts: 58,
    likes: 412,
  },
  {
    id: 'launch',
    person: 'dev',
    time: '2h',
    body: 'Shipped a small quality-of-life update that took an afternoon but will save our team hours every week. Those are my favorite kind of features.',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85',
    replies: 16,
    reposts: 67,
    likes: 528,
  },
  {
    id: 'career',
    person: 'jordan',
    time: '3h',
    body: 'Your portfolio should show what you can build, but your README should show how you think. Both matter when a hiring team is deciding who to meet.',
    replies: 9,
    reposts: 42,
    likes: 321,
  },
  {
    id: 'accessibility',
    person: 'maya',
    time: '5h',
    body: 'Quick accessibility check: is every interactive thing on your page usable with a keyboard? If not, that is the next feature to build.',
    replies: 31,
    reposts: 104,
    likes: 701,
  },
  {
    id: 'motion',
    person: 'nina',
    time: '6h',
    body: 'The best motion design does not call attention to itself. It helps people understand where they are, what changed, and what to do next.',
    replies: 18,
    reposts: 82,
    likes: 644,
  },
  {
    id: 'api-notes',
    person: 'omar',
    time: '7h',
    body: 'Small API rule that saves headaches: model the empty, loading, and error states before you celebrate the success state.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85',
    replies: 24,
    reposts: 95,
    likes: 830,
  },
  {
    id: 'weekend',
    person: 'serena',
    time: '8h',
    body: 'Friendly reminder to make something small this weekend just because it is interesting. Your curiosity is part of your career too.',
    replies: 11,
    reposts: 39,
    likes: 367,
  },
  {
    id: 'review',
    person: 'marcus',
    time: '10h',
    body: 'Code review should make the code better and the author stronger. If it does neither, revise the way you are giving feedback.',
    replies: 42,
    reposts: 132,
    likes: 1180,
  },
  {
    id: 'workflows',
    person: 'alex',
    time: '12h',
    body: 'My favorite projects have a clear idea, a short feedback loop, and one detail that makes the finished experience memorable.',
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85',
    replies: 15,
    reposts: 71,
    likes: 596,
  },
  {
    id: 'learning',
    person: 'jamal',
    time: '1d',
    body: 'Today’s goal: keep improving the experience, test every route, and make sure every project is ready for someone else to explore.',
    replies: 6,
    reposts: 10,
    likes: 114,
  },
  {
    id: 'css',
    person: 'maya',
    time: '1d',
    body: 'CSS gets really fun when you treat layout as a system instead of a collection of one-off fixes.',
    replies: 27,
    reposts: 88,
    likes: 772,
  },
]

const trends = [
  ['Technology · Trending', 'React', '21.4K posts'],
  ['Design · Trending', 'Dark mode', '8,942 posts'],
  ['Portfolio · Trending', 'Build in public', '4,183 posts'],
  ['Career · Trending', 'Frontend developer', '3,728 posts'],
]
const navItems = [
  ['Home', '⌂', '/'],
  ['Explore', '⌕', '/explore'],
  ['Notifications', '♧', '/notifications'],
  ['Messages', '✉', '/messages'],
  ['Bookmarks', '▮', '/bookmarks'],
  ['Communities', '♢', '/communities'],
  ['Lists', '☷', '/lists'],
  ['Events', '◷', '/events'],
  ['Creator Studio', '▥', '/studio'],
  ['Profile', '◉', '/profile'],
]

const communities = [
  [
    'Frontend Friday',
    '18.4K members',
    'Share UI work, ask questions, and trade practical frontend tips.',
    '⚛',
  ],
  [
    'React Builders',
    '42.1K members',
    'A home for components, patterns, and shipping React projects.',
    '◈',
  ],
  [
    'Design Detail Club',
    '9,804 members',
    'For people who care about the small interaction details.',
    '✦',
  ],
]

const gifOptions = [
  ['https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif', 'Celebration GIF'],
  ['https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', 'Excited reaction GIF'],
  ['https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif', 'Happy reaction GIF'],
]

function Avatar({ person, large = false }) {
  const item = people[person]
  return (
    <img
      className={`avatar ${large ? 'avatar--large' : ''}`}
      src={item.photo}
      alt={`${item.name} profile`}
    />
  )
}

function FeedPost({ post, onLike, onReply }) {
  const [reposted, setReposted] = useState(false)
  const person = people[post.person]
  return (
    <article className="post">
      <Link to={`/profile/${post.person}`} className="avatar-link">
        <Avatar person={post.person} />
      </Link>
      <div className="post__body">
        <div className="post__meta">
          <Link to={`/profile/${post.person}`}>
            <strong>{person.name}</strong>
          </Link>
          <Link to={`/profile/${post.person}`}>{person.handle}</Link>
          <span>·</span>
          <span>{post.time}</span>
          <button className="icon-button more-button" aria-label="More post options">
            •••
          </button>
        </div>
        <Link to={`/status/${post.id}`} className="post__content-link">
          <p>{post.body}</p>
          {post.image && (
            <img
              className="post__image"
              src={post.image}
              alt={post.imageAlt || 'Post attachment'}
            />
          )}
        </Link>
        <div className="post__actions">
          <button onClick={() => onReply(person.name)} aria-label={`Reply to ${person.name}`}>
            ◌ {post.replies}
          </button>
          <button
            className={reposted ? 'is-reposted' : ''}
            onClick={() => setReposted(!reposted)}
            aria-label="Repost this post"
          >
            ↻ {post.reposts + Number(reposted)}
          </button>
          <button
            className={post.liked ? 'is-liked' : ''}
            onClick={() => onLike(post.id)}
            aria-label="Like this post"
          >
            {post.liked ? '♥' : '♡'} {post.likes}
          </button>
          <Link to={`/status/${post.id}`} aria-label="View post analytics">
            ▥ 1.8K
          </Link>
          <button aria-label="Share post">↗</button>
        </div>
      </div>
    </article>
  )
}

function Composer({
  draft,
  setDraft,
  attachment,
  setAttachment,
  replyTarget,
  setReplyTarget,
  submitPost,
}) {
  const remaining = 280 - draft.length
  const [picker, setPicker] = useState('')
  const emojis = ['🔥', '👏', '🚀', '💯', '✨', '🎉', '💙', '🙌', '😂', '👀']
  return (
    <form className="composer" onSubmit={submitPost}>
      <Avatar person="jamal" large />
      <div className="composer__content">
        {replyTarget && (
          <button className="replying-to" type="button" onClick={() => setReplyTarget('')}>
            Replying to {replyTarget} ×
          </button>
        )}
        <textarea
          id="post-composer"
          value={draft}
          maxLength="280"
          onChange={(event) => setDraft(event.target.value)}
          placeholder="What’s happening?"
        />
        {attachment && (
          <div className="attachment-preview">
            <img src={attachment.src} alt={attachment.alt} />
            <button
              type="button"
              onClick={() => setAttachment(null)}
              aria-label="Remove attachment"
            >
              ×
            </button>
          </div>
        )}
        {picker === 'emoji' && (
          <div className="emoji-picker">
            {emojis.map((emoji) => (
              <button
                type="button"
                key={emoji}
                onClick={() => {
                  setDraft(`${draft}${emoji}`)
                  setPicker('')
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
        {picker === 'gif' && (
          <div className="gif-picker">
            {gifOptions.map(([src, alt]) => (
              <button
                type="button"
                key={src}
                onClick={() => {
                  setAttachment({ src, alt })
                  setPicker('')
                }}
              >
                <img src={src} alt={alt} />
              </button>
            ))}
          </div>
        )}
        <div className="composer__tools">
          <div aria-label="Post media options">
            <button type="button" aria-label="Add image">
              ▧
            </button>
            <button
              type="button"
              aria-label="Add GIF"
              onClick={() => setPicker(picker === 'gif' ? '' : 'gif')}
            >
              GIF
            </button>
            <button type="button" aria-label="Add poll">
              ≡
            </button>
            <button
              type="button"
              aria-label="Add emoji"
              onClick={() => setPicker(picker === 'emoji' ? '' : 'emoji')}
            >
              ☺
            </button>
          </div>
          <span className={remaining < 20 ? 'count count--warning' : 'count'}>{remaining}</span>
          <button className="post-button" disabled={!draft.trim()}>
            Post
          </button>
        </div>
      </div>
    </form>
  )
}

function SideRail() {
  return (
    <aside className="right-rail">
      <Link className="search-box" to="/search">
        <span>⌕</span>
        <span>Search X</span>
      </Link>
      <section className="card subscribe-card">
        <h2>Subscribe to Premium</h2>
        <p>Get verified, post longer videos, and reach more people.</p>
        <Link className="post-button" to="/premium">
          Subscribe
        </Link>
      </section>
      <section className="card trends-card">
        <h2>What’s happening</h2>
        {trends.map(([label, topic, count]) => (
          <Link key={topic} className="trend" to={`/explore?q=${encodeURIComponent(topic)}`}>
            <span>{label}</span>
            <strong>{topic}</strong>
            <small>{count}</small>
            <b>•••</b>
          </Link>
        ))}
        <button className="show-more">Show more</button>
      </section>
      <section className="card follow-card">
        <h2>Who to follow</h2>
        {['jordan', 'dev', 'nina', 'omar'].map((id) => (
          <div className="follow" key={id}>
            <Link to={`/profile/${id}`}>
              <Avatar person={id} />
            </Link>
            <Link to={`/profile/${id}`} className="follow__identity">
              <span>
                <strong>{people[id].name}</strong>
                <small>{people[id].handle}</small>
              </span>
            </Link>
            <button>Follow</button>
          </div>
        ))}
        <button className="show-more">Show more</button>
      </section>
      <p className="legal">
        Terms of Service · Privacy Policy · Cookie Policy · Accessibility · Ads info · © 2026
        X-style portfolio project
      </p>
    </aside>
  )
}

function PageHeader({ title, subtitle }) {
  return (
    <header className="feed-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <small>{subtitle}</small>}
      </div>
      <Link className="icon-button" to="/settings" aria-label="Page settings">
        ⚙
      </Link>
    </header>
  )
}

function SocialApp() {
  const location = useLocation()
  const [posts, setPosts] = useState(starterPosts)
  const [draft, setDraft] = useState('')
  const [attachment, setAttachment] = useState(null)
  const [replyTarget, setReplyTarget] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [joinedCommunities, setJoinedCommunities] = useState(['Frontend Friday'])
  const [searchQuery, setSearchQuery] = useState('')
  const routeParts = location.pathname.split('/').filter(Boolean)
  const profileId = routeParts[0] === 'profile' ? routeParts[1] || 'jamal' : null
  const activeProfile = profileId && people[profileId] ? profileId : 'jamal'
  const profileSection = routeParts[0] === 'profile' ? routeParts[2] || 'posts' : null
  const postId = routeParts[0] === 'status' ? routeParts[1] : null
  const selectedPost = posts.find((post) => post.id === postId)
  const messageId = routeParts[0] === 'messages' ? routeParts[1] : null
  const page = useMemo(() => {
    if (location.pathname.startsWith('/profile')) return 'Profile'
    if (location.pathname.startsWith('/status')) return 'Status'
    if (location.pathname.startsWith('/messages/')) return 'Message thread'
    return (
      {
        '/': 'Home',
        '/explore': 'Explore',
        '/notifications': 'Notifications',
        '/messages': 'Messages',
        '/bookmarks': 'Bookmarks',
        '/premium': 'Premium',
        '/settings': 'Settings',
        '/communities': 'Communities',
        '/lists': 'Lists',
        '/search': 'Search',
        '/compose/post': 'Compose',
        '/events': 'Events',
        '/studio': 'Creator Studio',
        '/connect': 'Connect',
      }[location.pathname] || 'Home'
    )
  }, [location.pathname])
  function focusComposer() {
    document.querySelector('#post-composer')?.focus()
  }
  function submitPost(event) {
    event.preventDefault()
    const body = draft.trim()
    if (!body) return
    setPosts((current) => [
      {
        id: crypto.randomUUID(),
        person: 'jamal',
        time: 'now',
        body,
        image: attachment?.src,
        imageAlt: attachment?.alt,
        replies: 0,
        reposts: 0,
        likes: 0,
      },
      ...current,
    ])
    setDraft('')
    setAttachment(null)
    setReplyTarget('')
  }
  function toggleLike(id) {
    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) }
          : post
      )
    )
  }
  function replyTo(name) {
    setReplyTarget(name)
    focusComposer()
  }
  const feed = (
    <section aria-label="Feed posts">
      {posts.map((post) => (
        <FeedPost key={post.id} post={post} onLike={toggleLike} onReply={replyTo} />
      ))}
    </section>
  )

  return (
    <div className={`social-app ${darkMode ? 'theme-dark' : 'theme-light'}`}>
      <header className="mobile-header">
        <Link className="x-logo" to="/" aria-label="X home">
          𝕏
        </Link>
        <button
          className="icon-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Open navigation"
        >
          ☰
        </button>
      </header>
      <aside className={`sidebar ${menuOpen ? 'sidebar--open' : ''}`}>
        <Link className="x-logo x-logo--desktop" to="/" aria-label="X home">
          𝕏
        </Link>
        <nav>
          {navItems.map(([label, icon, to]) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) => (isActive ? 'nav-item nav-item--active' : 'nav-item')}
              onClick={() => setMenuOpen(false)}
            >
              <span>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
        <button className="post-button sidebar-post" onClick={focusComposer}>
          Post
        </button>
        <button className="account-switcher">
          <Avatar person="jamal" />
          <span>
            <strong>Jamal Ferguson</strong>
            <small>@miingo954</small>
          </span>
          <b>•••</b>
        </button>
      </aside>
      <main className="feed">
        {selectedPost && (
          <>
            <PageHeader title="Post" />
            <FeedPost post={selectedPost} onLike={toggleLike} onReply={replyTo} />
            <section className="reply-list">
              <h2>Replies</h2>
              {['alicia', 'dev'].map((person, index) => (
                <article className="reply-card" key={person}>
                  <Link to={`/profile/${person}`}>
                    <Avatar person={person} />
                  </Link>
                  <p>
                    <Link to={`/profile/${person}`}>
                      <strong>{people[person].name}</strong>
                    </Link>{' '}
                    {index
                      ? 'This is exactly the kind of project that shows great frontend thinking.'
                      : 'Love the direction — the responsive details look clean.'}
                  </p>
                </article>
              ))}
            </section>
          </>
        )}
        {page === 'Home' && (
          <>
            <PageHeader title="Home" />
            <Composer
              {...{
                draft,
                setDraft,
                attachment,
                setAttachment,
                replyTarget,
                setReplyTarget,
                submitPost,
              }}
            />
            <button className="show-posts">Show 14 posts</button>
            {feed}
          </>
        )}
        {page === 'Explore' && (
          <>
            <PageHeader title="Explore" />
            <section className="explore-hero">
              <p>Discover what’s happening</p>
              <h2>Trends for you</h2>
            </section>
            <section className="explore-video-row" aria-label="Featured videos">
              <article>
                <video
                  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div>
                  <span>Design · 12.5K views</span>
                  <h2>Small moments, big details</h2>
                </div>
              </article>
              <article>
                <video
                  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div>
                  <span>Creator spotlight · 8.1K views</span>
                  <h2>Ideas worth sharing</h2>
                </div>
              </article>
            </section>
            <section className="explore-grid">
              {trends
                .concat([
                  ['Sports · Trending', 'WNBA', '10.8K posts'],
                  ['Music · Trending', 'New music Friday', '7,612 posts'],
                  ['Technology · Trending', 'AI tools', '32.8K posts'],
                  ['Business · Trending', 'Remote work', '12.1K posts'],
                  ['Culture · Trending', 'Film photography', '5,027 posts'],
                  ['Learning · Trending', 'Open source', '9,411 posts'],
                ])
                .map(([label, topic, count]) => (
                  <article className="topic-card" key={topic}>
                    <span>{label}</span>
                    <h2>{topic}</h2>
                    <small>{count}</small>
                  </article>
                ))}
            </section>
            <h2 className="section-title">Top conversations</h2>
            {feed}
            <section className="explore-feature">
              <p>EDITOR’S PICK</p>
              <h2>How small product decisions add up to a better experience</h2>
              <span>Design Dispatch · 8 min read</span>
              <button>Read thread</button>
            </section>
            <section className="explore-events">
              <div>
                <p>LIVE NOW</p>
                <h2>Frontend Office Hours</h2>
                <span>4,812 people listening</span>
              </div>
              <Link to="/events">View events</Link>
            </section>
            <section className="suggested-feed">
              <h2>More to explore</h2>
              {posts
                .slice()
                .reverse()
                .slice(0, 6)
                .map((post) => (
                  <FeedPost
                    key={`explore-${post.id}`}
                    post={post}
                    onLike={toggleLike}
                    onReply={replyTo}
                  />
                ))}
            </section>
          </>
        )}
        {page === 'Notifications' && (
          <>
            <PageHeader title="Notifications" />
            <section className="notice-tabs">
              <button className="active">All</button>
              <button>Verified</button>
              <button>Mentions</button>
            </section>
            {[
              ['maya', 'liked your post about component systems.'],
              ['dev', 'followed you.'],
              ['alicia', 'replied: “This is exactly right.”'],
              ['jordan', 'reposted your post.'],
            ].map(([person, message], index) => (
              <article className="notification" key={message}>
                <Avatar person={person} />
                <div>
                  <strong>{people[person].name}</strong> {message}
                  <small>{index + 1}h</small>
                </div>
              </article>
            ))}
          </>
        )}
        {page === 'Messages' && !messageId && (
          <>
            <PageHeader title="Messages" />
            <section className="inbox-list">
              {['dev', 'maya', 'jordan'].map((person, index) => (
                <Link className="inbox-row" to={`/messages/${person}`} key={person}>
                  <Avatar person={person} />
                  <span>
                    <strong>{people[person].name}</strong>
                    <small>
                      {people[person].handle} · {index + 1}h
                    </small>
                    <p>
                      {index === 0
                        ? 'The social feed looks great. Are you planning to add Firebase next?'
                        : index === 1
                          ? 'I left feedback on your latest post.'
                          : 'Your portfolio is really coming together.'}
                    </p>
                  </span>
                </Link>
              ))}
            </section>
          </>
        )}
        {messageId && people[messageId] && (
          <>
            <PageHeader title={people[messageId].name} subtitle={people[messageId].handle} />
            <section className="message-thread">
              <p className="thread-date">Today</p>
              <div className="message-bubble message-bubble--them">
                Hey Jamal, the new social feed looks great. Are you planning to add Firebase next?
              </div>
              <div className="message-bubble message-bubble--me">
                Yep — guest access first, then Firebase Auth and Firestore for real posts.
              </div>
              <form className="message-composer">
                <input placeholder="Start a new message" />
                <button aria-label="Send message">➤</button>
              </form>
            </section>
          </>
        )}
        {page === 'Bookmarks' && (
          <>
            <PageHeader title="Bookmarks" subtitle="@miingo954" />
            <p className="page-note">
              Save posts you want to find again. Your bookmarks are private.
            </p>
            {posts.slice(0, 3).map((post) => (
              <FeedPost key={post.id} post={post} onLike={toggleLike} onReply={replyTo} />
            ))}
          </>
        )}
        {page === 'Communities' && (
          <>
            <PageHeader title="Communities" />
            <section className="community-hero">
              <h2>Find your people</h2>
              <p>Communities are focused spaces for the conversations you care about.</p>
              <Link className="post-button" to="/compose/post">
                Create a community
              </Link>
            </section>
            <section className="community-list">
              {communities.map(([name, members, description, mark]) => {
                const joined = joinedCommunities.includes(name)
                return (
                  <article className="community-card" key={name}>
                    <span className="community-mark">{mark}</span>
                    <div>
                      <h2>{name}</h2>
                      <small>{members}</small>
                      <p>{description}</p>
                    </div>
                    <button
                      onClick={() =>
                        setJoinedCommunities((current) =>
                          joined ? current.filter((item) => item !== name) : [...current, name]
                        )
                      }
                    >
                      {joined ? 'Joined' : 'Join'}
                    </button>
                  </article>
                )
              })}
            </section>
          </>
        )}
        {page === 'Lists' && (
          <>
            <PageHeader title="Lists" />
            <section className="lists-hero">
              <h2>Discover new lists</h2>
              <p>Lists help you keep up with the people and topics that matter most.</p>
              <Link className="post-button" to="/compose/post">
                Create a list
              </Link>
            </section>
            <section className="list-card">
              <span className="list-cover list-cover--one" />
              <div>
                <h2>Frontend people to follow</h2>
                <p>Curated by @miingo954 · 12 members</p>
                <button>Follow list</button>
              </div>
            </section>
            <section className="list-card">
              <span className="list-cover list-cover--two" />
              <div>
                <h2>Design inspiration</h2>
                <p>Curated by @mayacodes · 31 members</p>
                <button>Follow list</button>
              </div>
            </section>
          </>
        )}
        {page === 'Search' && (
          <>
            <PageHeader title="Search" />
            <section className="search-page">
              <label>
                <span>⌕</span>
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search people and posts"
                />
              </label>
              <div className="search-chips">
                {['React', 'Design', 'JavaScript', 'Portfolio'].map((topic) => (
                  <button key={topic} onClick={() => setSearchQuery(topic)}>
                    {topic}
                  </button>
                ))}
              </div>
              <h2>{searchQuery ? `Results for “${searchQuery}”` : 'Suggested people'}</h2>
              {Object.entries(people)
                .filter(
                  ([id, person]) =>
                    !searchQuery ||
                    `${id} ${person.name} ${person.handle}`
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
                .map(([id, person]) => (
                  <Link className="search-person" key={id} to={`/profile/${id}`}>
                    <Avatar person={id} />
                    <span>
                      <strong>{person.name}</strong>
                      <small>{person.handle}</small>
                    </span>
                    <b>Follow</b>
                  </Link>
                ))}
            </section>
          </>
        )}
        {page === 'Compose' && (
          <>
            <PageHeader title="Create post" />
            <Composer
              {...{
                draft,
                setDraft,
                attachment,
                setAttachment,
                replyTarget,
                setReplyTarget,
                submitPost,
              }}
            />
            <section className="composer-help">
              <h2>Share something worth talking about</h2>
              <p>
                Posts are stored locally for this portfolio demo. Firebase Auth and Firestore are
                already installed for the live-data phase.
              </p>
            </section>
          </>
        )}
        {page === 'Events' && (
          <>
            <PageHeader title="Events" />
            <section className="events-hero">
              <p>Live conversations happening now</p>
              <h2>Make your next connection</h2>
              <Link className="post-button" to="/compose/post">
                Create event
              </Link>
            </section>
            <section className="event-list">
              {[
                [
                  'Design systems live',
                  'Today · 5:00 PM',
                  'Maya Chen and 2,300 others are discussing practical component systems.',
                ],
                [
                  'React build night',
                  'Tomorrow · 7:30 PM',
                  'Join builders sharing what they made this week.',
                ],
                [
                  'Portfolio feedback room',
                  'Friday · 2:00 PM',
                  'Live feedback for frontend portfolios and project READMEs.',
                ],
              ].map(([title, time, copy], index) => (
                <article key={title}>
                  <span className={`event-date event-date--${index + 1}`}>
                    {index + 2}
                    <small>SEP</small>
                  </span>
                  <div>
                    <h2>{title}</h2>
                    <small>{time}</small>
                    <p>{copy}</p>
                  </div>
                  <button>Remind me</button>
                </article>
              ))}
            </section>
          </>
        )}
        {page === 'Creator Studio' && (
          <>
            <PageHeader title="Creator Studio" />
            <section className="studio-hero">
              <span>✦</span>
              <div>
                <p>Creator dashboard</p>
                <h2>Good afternoon, Jamal</h2>
                <p>See how your posts and conversations are performing.</p>
              </div>
            </section>
            <section className="metrics-grid">
              {[
                ['18.4K', 'Post impressions'],
                ['1,284', 'Profile visits'],
                ['728', 'Engagements'],
                ['+14%', 'Growth this month'],
              ].map(([metric, label]) => (
                <article key={label}>
                  <strong>{metric}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </section>
            <section className="studio-card">
              <h2>Recent content</h2>
              {posts.slice(0, 4).map((post) => (
                <Link to={`/status/${post.id}`} key={post.id}>
                  <span>{post.body}</span>
                  <b>{post.likes} likes</b>
                </Link>
              ))}
            </section>
          </>
        )}
        {page === 'Connect' && (
          <>
            <PageHeader title="Connect" />
            <section className="connect-page">
              <h2>People you may know</h2>
              <p>Follow people who are building, learning, and sharing good work.</p>
              {['nina', 'omar', 'serena', 'marcus', 'alex'].map((person) => (
                <article key={person}>
                  <Link to={`/profile/${person}`}>
                    <Avatar person={person} />
                  </Link>
                  <div>
                    <Link to={`/profile/${person}`}>
                      <strong>{people[person].name}</strong>
                      <small>{people[person].handle}</small>
                    </Link>
                    <p>Follow to see their latest posts and conversations.</p>
                  </div>
                  <button>Follow</button>
                </article>
              ))}
            </section>
          </>
        )}
        {page === 'Profile' && (
          <>
            <PageHeader title={people[activeProfile].name} />
            <section className="profile-hero">
              <div className="profile-cover" />
              <div className="profile-details">
                <Avatar person={activeProfile} large />
                {activeProfile === 'jamal' ? (
                  <Link className="edit-profile" to="/settings">
                    Edit profile
                  </Link>
                ) : (
                  <span className="profile-actions">
                    <button>Follow</button>
                    <Link to={`/messages/${activeProfile}`}>Message</Link>
                  </span>
                )}
                <h2>
                  {people[activeProfile].name} <span>✓</span>
                </h2>
                <p className="handle">{people[activeProfile].handle}</p>
                <p>
                  {activeProfile === 'jamal'
                    ? 'Frontend developer building polished, responsive web experiences with React, JavaScript, CSS, Firebase, and APIs.'
                    : 'Designing thoughtful products, sharing useful ideas, and connecting with people who love the web.'}
                </p>
                <p className="profile-meta">
                  📍 {activeProfile === 'jamal' ? 'California' : 'Worldwide'} · 📅 Joined 2026
                </p>
                <p>
                  <Link to={`/profile/${activeProfile}/following`}>
                    <strong>214</strong> Following
                  </Link>{' '}
                  &nbsp;
                  <Link to={`/profile/${activeProfile}/followers`}>
                    <strong>1,084</strong> Followers
                  </Link>
                </p>
              </div>
            </section>
            <nav className="profile-tabs">
              <Link
                className={profileSection === 'posts' ? 'active' : ''}
                to={`/profile/${activeProfile}`}
              >
                Posts
              </Link>
              <Link
                className={profileSection === 'replies' ? 'active' : ''}
                to={`/profile/${activeProfile}/replies`}
              >
                Replies
              </Link>
              <Link
                className={profileSection === 'media' ? 'active' : ''}
                to={`/profile/${activeProfile}/media`}
              >
                Media
              </Link>
              <Link
                className={profileSection === 'likes' ? 'active' : ''}
                to={`/profile/${activeProfile}/likes`}
              >
                Likes
              </Link>
            </nav>
            {['followers', 'following'].includes(profileSection) ? (
              <section className="people-list">
                {['maya', 'alicia', 'dev', 'jordan'].map((person) => (
                  <article key={person}>
                    <Link to={`/profile/${person}`}>
                      <Avatar person={person} />
                    </Link>
                    <div>
                      <Link to={`/profile/${person}`}>
                        <strong>{people[person].name}</strong>
                        <small>{people[person].handle}</small>
                      </Link>
                      <p>Building useful things and sharing what they learn along the way.</p>
                    </div>
                    <button>Follow</button>
                  </article>
                ))}
              </section>
            ) : (
              posts
                .filter((post) =>
                  profileSection === 'media'
                    ? post.person === activeProfile && post.image
                    : post.person === activeProfile
                )
                .map((post) => (
                  <FeedPost key={post.id} post={post} onLike={toggleLike} onReply={replyTo} />
                ))
            )}
          </>
        )}
        {page === 'Premium' && (
          <>
            <PageHeader title="Premium" />
            <section className="premium-page">
              <span className="premium-mark">𝕏</span>
              <h2>Upgrade your experience</h2>
              <p>
                Get priority replies, longer posts, a verified badge, and creator tools in this
                portfolio demo.
              </p>
              <button className="post-button">Choose Premium</button>
            </section>
          </>
        )}
        {page === 'Settings' && (
          <>
            <PageHeader title="Settings" />
            <section className="settings-list">
              {[
                'Your account',
                'Security and account access',
                'Privacy and safety',
                'Notifications',
                'Accessibility, display, and languages',
              ].map((item) => (
                <button key={item}>
                  {item}
                  <span>›</span>
                </button>
              ))}
            </section>
          </>
        )}
      </main>
      <SideRail />
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle color theme"
      >
        {darkMode ? '☼' : '◐'}
      </button>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.slice(0, 5).map(([label, icon, to]) => (
          <Link key={label} to={to}>
            {icon}
          </Link>
        ))}
        <button onClick={focusComposer}>＋</button>
      </nav>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <SocialApp />
    </HashRouter>
  )
}
