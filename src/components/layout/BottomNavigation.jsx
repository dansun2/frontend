'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// 네비게이션 아이템 배열
const navItems = [
  {
    key: 'home',
    label: '홈',
    icon: '/images/home.svg',
    href: '/',
    activeColor: '#f59e42',
  },
  {
    key: 'refrigerator',
    label: '냉장고',
    icon: '/images/Vector.svg',
    href: '/refrigerator',
    activeColor: '#f59e42',
  },
  {
    key: 'recipes',
    label: '레시피',
    icon: '/images/bookmark.svg',
    href: '/bookmark-page',
    activeColor: '#f59e42',
  },
  {
    key: 'mypage',
    label: '마이페이지',
    icon: '/images/user.svg',
    href: '/mypage',
    activeColor: '#f59e42',
  },
];

// 로그인 여부 확인 함수 (localStorage에 accessToken 유무로 체크)
function isLoggedIn() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem('accessToken');
}

const BottomNavigation = ({ className = '' }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [clientReady, setClientReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setClientReady(true);
    setLoggedIn(isLoggedIn());
  }, []);

  const isItemActive = (item) => {
    if (item.href === '/') return pathname === '/';
    return pathname.startsWith(item.href);
  };

  // 마이페이지 클릭 핸들러
  const handleMypageClick = (e) => {
    e.preventDefault();
    if (loggedIn) {
      router.push('/mypage');
    } else {
      router.push('/login');
    }
  };

  return (
      <nav
        style={{
          position: 'fixed',
          bottom: 0, // 기본값
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '430px',
          background: '#fff',
          borderRadius: '0 0 12px 12px',
          boxShadow: '0px -2px 10px 0px rgb(13 10 44 / 9%)',
          zIndex: 1002,
          height: 70,
          boxSizing: 'border-box',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
        className={`${className} bottom-nav`} // 클래스 추가
      >
      <ul
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: '100%',
          margin: 0,
          padding: '0 16px',
          listStyle: 'none',
          maxWidth: '100%',
        }}
      >
        {navItems.map((item) => {
          const isActive = isItemActive(item);

          // 마이페이지는 SSR hydration mismatch 방지 분기!
          if (item.key === "mypage") {
            return (
              <li
                key={item.key}
                style={{
                  flex: 1,
                  maxWidth: '25%',
                  textAlign: 'center',
                }}
              >
                {clientReady ? (
                  <a
                    href={loggedIn ? '/mypage' : '/login'}
                    onClick={handleMypageClick}
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: isActive ? item.activeColor : '#666',
                        padding: '8px 0',
                      }}
                    >
                      <img
                        src={item.icon}
                        alt={item.label}
                        style={{
                          width: 20,
                          height: 20,
                          marginBottom: 4,
                          filter: isActive
                            ? 'invert(67%) sepia(51%) saturate(1022%) hue-rotate(346deg) brightness(101%) contrast(87%)'
                            : 'grayscale(100%) brightness(0.7)',
                          transition: 'all 0.2s ease',
                        }}
                      />
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: isActive ? 'bold' : 'normal',
                          color: isActive ? item.activeColor : '#666',
                          marginTop: 2,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                  </a>
                ) : (
                  // SSR 시엔 클릭 막고, href="/login" 고정 (hydration mismatch 방지)
                  <a
                    href="/login"
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                      width: '100%',
                      pointerEvents: 'none',
                      opacity: 0.6,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: isActive ? item.activeColor : '#666',
                        padding: '8px 0',
                      }}
                    >
                      <img
                        src={item.icon}
                        alt={item.label}
                        style={{
                          width: 20,
                          height: 20,
                          marginBottom: 4,
                          filter: isActive
                            ? 'invert(67%) sepia(51%) saturate(1022%) hue-rotate(346deg) brightness(101%) contrast(87%)'
                            : 'grayscale(100%) brightness(0.7)',
                          transition: 'all 0.2s ease',
                        }}
                      />
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: isActive ? 'bold' : 'normal',
                          color: isActive ? item.activeColor : '#666',
                          marginTop: 2,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                  </a>
                )}
              </li>
            );
          }

          // 나머지 메뉴는 Link로
          return (
            <li
              key={item.key}
              style={{
                flex: 1,
                maxWidth: '25%',
                textAlign: 'center',
              }}
            >
              <Link
                href={item.href}
                style={{
                  textDecoration: 'none',
                  display: 'block',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    color: isActive ? item.activeColor : '#666',
                    padding: '8px 0',
                  }}
                >
                  <img
                    src={item.icon}
                    alt={item.label}
                    style={{
                      width: 20,
                      height: 20,
                      marginBottom: 4,
                      filter: isActive
                        ? 'invert(67%) sepia(51%) saturate(1022%) hue-rotate(346deg) brightness(101%) contrast(87%)'
                        : 'grayscale(100%) brightness(0.7)',
                      transition: 'all 0.2s ease',
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: isActive ? 'bold' : 'normal',
                      color: isActive ? item.activeColor : '#666',
                      marginTop: 2,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNavigation;
