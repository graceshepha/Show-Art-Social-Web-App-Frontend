
type navItem = {
    name: string;
    href: string;
  }

const navigation: navItem[] = [
    { name: 'Home', href: '#'},
    { name: 'Arts', href: '/arts'},
    { name: 'Topis', href: '/topics'}
]

export default function NavBar() {
  return (
    <nav className="flex sm:justify-center space-x-4 bg-red-300" >
        {navigation.map((item) => (
            <a href={item.href} key={item.name} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{item.name}</a>
        ))}
    </nav>
  )
}
