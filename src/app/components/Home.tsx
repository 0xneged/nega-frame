import env from '@/env'
import Image from 'next/image'

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1rem',
        width: 'fit',
      }}
    >
      <Image src="/img/sadPaper.png" alt="sad-paper" width={75} height={75} />
      <span style={{ fontSize: '2rem', fontWeight: 800 }}>
        Nothing. Just nothing
      </span>
      <span>
        Get nothing - CA - <a>0xNothing</a>
      </span>
      <span style={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>
        Find us here:{' '}
        <a
          href={env.SOCIAL_PAGE}
          target="_blank"
          style={{
            all: 'unset',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          WarpCast
        </a>
      </span>
      <a
        href={env.SOCIAL_PAGE}
        style={{
          all: 'unset',
          cursor: 'pointer',
          alignSelf: 'end',
        }}
        target="_blank"
      >
        <button
          style={{
            color: 'white',
            backgroundColor: '#1973E7',
            padding: '0.5rem 0.75rem',
            outline: 'none',
            border: 'none',
            borderRadius: '2rem',
            cursor: 'pointer',
          }}
        >
          Reload
        </button>
      </a>
    </div>
  )
}
