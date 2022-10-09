export class GroupLink {
  public links: Link[] = []

  constructor (public label: string, public policy?: string) {
  }

  public addLink (label: string, description: string, href: string, active: boolean = false, policy?: string, icon?: string) {
    this.links.push(new Link(label, description, href, active, policy, icon))
    return this
  }
}

export class Link {
  constructor (public label: string, public description: string, public href: string, public active: boolean = false, public policy?: string, public icon?: string) {
  }
}
